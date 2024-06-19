import League from '#models/league'

export class LeagueRepository {
  create(name: string, code: string) {
    return League.create({ name, code })
  }

  findByCode(code: string) {
    return League.findBy('code', code)
  }
}
