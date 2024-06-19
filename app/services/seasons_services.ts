import Qualifying from '#models/qualifying'
import Race from '#models/race'
import Season from '#models/season'
import { QualifyingRepository } from '../repositories/qualifyings_repository.js'
import { RaceRepository } from '../repositories/races_repository.js'
import { SeasonRepository } from '../repositories/seasons_repository.js'
import ApiSportsService from './api_sports_services.js'
import { inject } from '@adonisjs/core'
import { InputDriver, SeasonRacesQualifyings } from '../type/interface.js'
import { dateIsPast } from '../utils/utils.js'
import { DriverRepository } from '../repositories/drivers_repository.js'
import Driver from '#models/driver'

@inject()
export default class SeasonsService {
  constructor(
    private seasonRepository: SeasonRepository,
    private apiSportsService: ApiSportsService,
    private qualifyingRepository: QualifyingRepository,
    private raceRepository: RaceRepository,
    private driverRepository: DriverRepository
  ) {}

  async getSeasonByYear(year: number): Promise<Season> {
    const currentSeason = await this.seasonRepository.findByYear(year)

    if (currentSeason) return currentSeason

    return this.seasonRepository.create(year)
  }

  async getSeasonRacesQualifyings(year: number): Promise<SeasonRacesQualifyings> {
    let season = await this.getSeasonByYear(year)

    let seasonRacesQualifyings: SeasonRacesQualifyings
    if (season.status === 'started' || season.status === 'finished')
      seasonRacesQualifyings = await this.getRacesQualifyings(season)
    else seasonRacesQualifyings = await this.initRacesQualifyings(season)

    seasonRacesQualifyings = await this.updateSeasonRacesQualifyings(seasonRacesQualifyings)

    return seasonRacesQualifyings
  }

  async getRacesQualifyings(season: Season): Promise<SeasonRacesQualifyings> {
    const races = await this.raceRepository.getBySeason(season.id)
    const qualifyings = await this.qualifyingRepository.getBySeason(season.id)

    return { season, races, qualifyings }
  }

  async initRacesQualifyings(season: Season): Promise<SeasonRacesQualifyings> {
    const racesQualifyings = await this.apiSportsService.getRacesQualifyings(season)

    if (racesQualifyings.races.length === 0 || racesQualifyings.qualifyings.length === 0)
      return { season, races: [], qualifyings: [] }

    const races = await this.raceRepository.createMany(racesQualifyings.races)
    const qualifyings = await this.qualifyingRepository.createMany(racesQualifyings.qualifyings)

    season.status = 'started'
    season.nbRound = races.length
    await season.save()

    return { season, races, qualifyings }
  }

  async updatePastRaces(races: Race[]): Promise<Race[]> {
    let newRaces: Race[] = await Promise.all(
      races.map(async (race: Race) => {
        if (dateIsPast(race.date.toString()) && !race.ranking) {
          let results = await this.apiSportsService.getResult(race.id_api)
          if (results.length > 0) {
            race.ranking = JSON.stringify(results)
            race.past = true
            await race.save()
          }
        }
        return race
      })
    )

    return newRaces
  }

  async updatePastQualifyings(qualifyings: Qualifying[]): Promise<Qualifying[]> {
    let newQualifyings: Qualifying[] = await Promise.all(
      qualifyings.map(async (qualifying: Qualifying) => {
        if (dateIsPast(qualifying.date.toString()) && !qualifying.ranking) {
          let results = await this.apiSportsService.getResult(qualifying.id_api)
          if (results.length > 0) {
            qualifying.ranking = JSON.stringify(results)
            qualifying.past = true
            await qualifying.save()
          }
        }
        return qualifying
      })
    )

    return newQualifyings
  }

  async updateSeason(
    seasonRacesQualifyings: SeasonRacesQualifyings
  ): Promise<SeasonRacesQualifyings> {
    let nextRace = seasonRacesQualifyings.races.find((race: Race) => !race.ranking)

    let nextQualifying = seasonRacesQualifyings.qualifyings.find(
      (qualifying: Qualifying) => !qualifying.ranking
    )

    if (nextRace === undefined) {
      seasonRacesQualifyings.season.status = 'finished'
      seasonRacesQualifyings.season.save()

      return seasonRacesQualifyings
    }

    if (nextQualifying && nextQualifying.round > nextRace.round) {
      seasonRacesQualifyings.season.qualifyingPast = true
      seasonRacesQualifyings.season.nextDate = nextRace.date
    } else if (nextQualifying && nextQualifying.round === nextRace.round) {
      seasonRacesQualifyings.season.qualifyingPast = false
      seasonRacesQualifyings.season.nextDate = nextQualifying.date
    }

    seasonRacesQualifyings.season.currentRound = nextRace.round
    seasonRacesQualifyings.season.save()

    return seasonRacesQualifyings
  }

  async updateSeasonRacesQualifyings(
    seasonRacesQualifyings: SeasonRacesQualifyings
  ): Promise<SeasonRacesQualifyings> {
    seasonRacesQualifyings.races = await this.updatePastRaces(seasonRacesQualifyings.races)
    seasonRacesQualifyings.qualifyings = await this.updatePastQualifyings(
      seasonRacesQualifyings.qualifyings
    )

    seasonRacesQualifyings = await this.updateSeason(seasonRacesQualifyings)

    return seasonRacesQualifyings
  }

  async getDrivers(year: number): Promise<Driver[]> {
    let drivers = await this.driverRepository.getActive()

    if (drivers.length > 10) return drivers

    let inputDrivers: InputDriver[] = []
    inputDrivers = await this.apiSportsService.getDrivers(year)

    if (!inputDrivers.length) return []

    drivers = await this.driverRepository.updateOrCreate(inputDrivers)

    return drivers
  }
}
