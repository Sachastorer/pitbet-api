import Race from '#models/race'
import { InputRace } from '../type/interface.js'

export class RaceRepository {
  create(race: InputRace) {
    return Race.create({
      year: race.year,
      round: race.round,
      past: race.past,
      name: race.name,
      circuit: race.circuit,
      country: race.country,
      id_api: race.id_api,
      date: race.date,
      seasonId: race.seasonId,
    })
  }

  createMany(races: InputRace[]) {
    return Race.createMany(races)
  }

  getBySeason(seasonId: number) {
    return Race.query().where('seasonId', seasonId).orderBy('round', 'asc')
  }
}
