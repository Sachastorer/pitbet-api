import Season from '#models/season'

export class SeasonRepository {
  findByYear(year: number) {
    return Season.query().preload('races').where('year', year).first()
  }

  create(year: number) {
    return Season.create({ year })
  }
}
