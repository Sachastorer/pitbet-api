import axios from 'axios'
import { inject } from '@adonisjs/core'
import env from '#start/env'
import { InputDriver } from '../type/interface.js'

import { InputRace } from '../type/interface.js'
import Season from '#models/season'

const headers = {
  'x-rapidapi-host': 'v1.formula-1.api-sports.io',
  'x-rapidapi-key': env.get('API_SPORTS_KEY'),
}

@inject()
export default class ApiSportsService {
  async getDrivers(year: number): Promise<InputDriver[]> {
    console.log(`API SPORTS REQUEST /rankings/drivers?season=${year}`)

    const response = await axios.get(
      `${env.get('API_SPORTS_URL')}/rankings/drivers?season=${year}`,
      {
        headers,
      }
    )

    return response.data.response.map((d: any) => {
      return {
        driverId: d.driver.name.replaceAll(' ', '_').toLowerCase(),
        idApi: d.driver.id,
        name: d.driver.name,
        abbr: d.driver.abbr,
        number: d.driver.number,
        team: d.team.name,
        rank: d.position,
        nationality: '',
        dateOfBirth: '',
        note: 0,
        price: 0,
        color: '',
        salary: 0,
        active: true,
      }
    })
  }

  async getRacesQualifyings(
    season: Season
  ): Promise<{ races: InputRace[]; qualifyings: InputRace[] }> {
    console.log(`API SPORTS REQUEST /races?season=${season.year}`)
    const response = await axios.get(`${env.get('API_SPORTS_URL')}/races?season=${season.year}`, {
      headers,
    })

    if (!response.data) return { races: [], qualifyings: [] }

    const races = this.formatRaces('Race', response.data.response, season.id)
    const qualifyings = this.formatRaces('3rd Qualifying', response.data.response, season.id)

    return { races, qualifyings }
  }

  async getResult(idApi: number): Promise<string[]> {
    console.log(`API SPORTS REQUEST /rankings/races?race=${idApi}`)
    const response = await axios.get(`${env.get('API_SPORTS_URL')}/rankings/races?race=${idApi}`, {
      headers,
    })

    if (!response.data) return []

    let ranking: string[] = response.data.response.map((rank: any) => {
      return `${rank.driver.id};${rank.driver.name};${rank.driver.abbr};${rank.team.name};${rank.position};${rank.time};${rank.laps};${rank.grid};${rank.pits}`
    })

    return ranking
  }

  formatRaces(type: string, response: Array<Object>, seasonId: number): InputRace[] {
    let races = response
      .filter((r: any) => r.type === type)
      .sort((raceA: any, raceB: any) => {
        return new Date(raceA.date).getTime() - new Date(raceB.date).getTime()
      })

    return races.map((race: any, i: number) => {
      return {
        year: race.season,
        round: i + 1,
        past: false,
        name: race.competition.name,
        circuit: race.circuit.name,
        locality: race.competition.location.city,
        country: race.competition.location.country,
        id_api: race.id,
        date: new Date(race.date),
        seasonId,
      }
    })
  }
}
