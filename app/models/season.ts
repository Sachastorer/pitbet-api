import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Race from './race.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Qualifying from './qualifying.js'

export default class Season extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare year: number

  @column()
  declare nbRound: number

  @column()
  declare currentRound: number

  @column()
  declare nextDate: Date

  @column()
  declare qualifyingPast: boolean

  @column()
  declare status: string

  @column()
  declare pilots: JSON

  @hasMany(() => Race)
  declare races: HasMany<typeof Race>

  @hasMany(() => Qualifying)
  declare qualifyings: HasMany<typeof Qualifying>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
