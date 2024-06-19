import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createLeagueValidator } from '#validators/league_validator'

import LeagueServices from '#services/leagues_services'
import { inject } from '@adonisjs/core'
import CustomException from '#exceptions/custom_exception'

@inject()
export default class LeaguesController {
  constructor(private leagueServices: LeagueServices) {}
  async create({ request, response, auth }: HttpContext) {
    const user: User = auth.getUserOrFail()
    const { name } = await request.validateUsing(createLeagueValidator)

    try {
      const league = await this.leagueServices.create(user.id, name)
      return response.status(200).send({ error: false, message: 'League created', league })
    } catch (error) {
      if (error instanceof CustomException)
        return response
          .status(error.status)
          .send({ error: true, message: error.message, league: null })

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async join({ response, params, auth }: HttpContext) {
    const newUser: User = auth.getUserOrFail()
    const code = params.code.toUpperCase()

    try {
      const existingLeague = await this.leagueServices.join(newUser.id, code)
      return response
        .status(200)
        .send({ error: false, message: 'User added to league', league: existingLeague })
    } catch (error) {
      if (error instanceof CustomException)
        return response
          .status(error.status)
          .send({ error: true, message: error.message, league: null })

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async start({ response, params, auth }: HttpContext) {
    const user: User = auth.getUserOrFail()
    const leagueId = params.leagueId
    const homeAway = params.homeAway

    // try {
    //   const league =
    // } catch (error) {

    // }
  }
}
