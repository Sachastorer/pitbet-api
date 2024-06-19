import { inject } from '@adonisjs/core'
import { UserLeagueRepository } from '../repositories/user_leagues_respository.js'
import League from '#models/league'
import { LeagueRepository } from '../repositories/leagues_repository.js'
import { generateCodeLeague } from '../utils/utils.js'
import CustomException from '#exceptions/custom_exception'

interface LeagueDuelsBidsPronos {
  league: League
}

@inject()
export default class LeagueServices {
  constructor(
    private userLeagueRepository: UserLeagueRepository,
    private leagueRepository: LeagueRepository
  ) {}

  async create(userId: number, name: string): Promise<League | null> {
    let code = generateCodeLeague()
    const league = await this.leagueRepository.create(name, code)
    const userToLeague = await this.userLeagueRepository.createAdmin(userId, league.id)

    if (!league || !userToLeague) throw new CustomException('Error creating league', 500)

    return league
  }

  async join(userId: number, code: string): Promise<League> {
    const existingLeague = await this.leagueRepository.findByCode(code)
    if (!existingLeague) throw new CustomException('League does not exist', 404)

    const usersLeague = await this.userLeagueRepository.findByLeagueId(existingLeague.id)

    const alreadyAddedUser = usersLeague.find((user) => user.user_id === userId)

    if (alreadyAddedUser) throw new CustomException('User already added', 409)

    if (usersLeague.length > 7) throw new CustomException('Limit of users reached in league', 409)

    await this.userLeagueRepository.create(userId, existingLeague.id)

    return existingLeague
  }

  async start(userId: number, leagueId: number, homeAway: number) {}
}
