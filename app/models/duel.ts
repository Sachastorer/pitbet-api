import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import League from './league.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Prono from './prono.js'
import UserLeague from './user_league.js'
import Bid from './bid.js'

export default class Duel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare year: number

  @column()
  declare round: number

  @column()
  declare roundL: number

  @column()
  declare dateLimitProno: DateTime

  @column()
  declare dateLimitBid: DateTime

  @column()
  declare computed: boolean

  @column()
  declare pointPlayer1: number

  @column()
  declare pointPlayer2: number

  @column()
  declare leagueId: number

  @belongsTo(() => League)
  declare league: BelongsTo<typeof League>

  @column()
  declare userLeague1Id: number

  @column()
  declare userLeague2Id: number

  @belongsTo(() => UserLeague)
  declare userLeagues: BelongsTo<typeof UserLeague>

  @hasMany(() => Prono)
  declare pronos: HasMany<typeof Duel>

  @hasMany(() => Bid)
  declare bids: HasMany<typeof Bid>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
