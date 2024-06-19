import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare idApi: number

  @column()
  declare driverId: string

  @column()
  declare name: string

  @column()
  declare abbr: string

  @column()
  declare price: number

  @column()
  declare rank: number

  @column()
  declare note: number

  @column()
  declare salary: number

  @column()
  declare team: string

  @column()
  declare active: boolean

  @column()
  declare color: string

  @column()
  declare nationality: string

  @column()
  declare number: number

  @column()
  declare dateOfBirth: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
