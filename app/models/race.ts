import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Season from './season.js'

export default class Race extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare year: number

  @column()
  declare round: number

  @column()
  declare past: boolean

  @column()
  declare name: string

  @column()
  declare circuit: string

  @column()
  declare locality: string

  @column()
  declare country: string

  @column()
  declare id_api: number

  @column()
  declare date: Date

  @column()
  declare ranking: Object

  @column()
  declare seasonId: number

  @belongsTo(() => Season)
  declare season: BelongsTo<typeof Season>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
