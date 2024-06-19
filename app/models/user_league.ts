import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import League from '#models/league'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class UserLeague extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare admin: boolean

  @column()
  declare points: number

  @column()
  declare pointsPilot: number

  @column()
  declare user_id: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare league_id: number

  @belongsTo(() => League)
  declare league: BelongsTo<typeof League>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
