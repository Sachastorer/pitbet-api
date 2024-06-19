import { HttpContext } from '@adonisjs/core/http'
import SeasonsService from '#services/seasons_services'
import { inject } from '@adonisjs/core'
import ApiSportsService from '#services/api_sports_services'

@inject()
export default class AdminsController {
  constructor(
    private seasonService: SeasonsService,
    private apiSportsService: ApiSportsService
  ) {}
  async test({ request, response }: HttpContext) {
    const now = new Date()
    const year = now.getFullYear()
    let seasonRacesQualifyings = await this.seasonService.getSeasonRacesQualifyings(year)

    let drivers = await this.seasonService.getDrivers(year)

    console.log(drivers.length)

    return response.ok({ message: 'ok' })
  }
}
