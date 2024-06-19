import Qualifying from '#models/qualifying'
import { InputRace } from '../type/interface.js'

export class QualifyingRepository {
  create(qualifying: InputRace) {
    return Qualifying.create({
      year: qualifying.year,
      round: qualifying.round,
      past: qualifying.past,
      name: qualifying.name,
      circuit: qualifying.circuit,
      country: qualifying.country,
      id_api: qualifying.id_api,
      date: qualifying.date,
      seasonId: qualifying.seasonId,
    })
  }

  createMany(qualifyings: InputRace[]): Promise<Qualifying[]> {
    return Qualifying.createMany(qualifyings)
  }

  getBySeason(seasonId: number) {
    return Qualifying.query().where('seasonId', seasonId).orderBy('round', 'asc')
  }
}
