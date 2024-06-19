import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Duel from './duel.js'

export default class League extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare code: string

  @column()
  declare year: number

  @column()
  declare firstRound: number

  @column()
  declare nbroundL: number

  @column()
  declare currentroundL: number

  @column()
  declare status: string

  @hasMany(() => Duel)
  declare duels: HasMany<typeof Duel>

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
