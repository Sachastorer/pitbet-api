import UserLeague from '#models/user_league'

export class UserLeagueRepository {
  createAdmin(userId: number, leagueId: number) {
    return UserLeague.create({ user_id: userId, league_id: leagueId, admin: true })
  }

  create(userId: number, leagueId: number) {
    return UserLeague.create({ user_id: userId, league_id: leagueId, admin: false })
  }

  findByLeagueId(leagueId: number) {
    return UserLeague.query().where('league_id', leagueId)
  }
}
