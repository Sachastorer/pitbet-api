import { BaseSchema } from '@adonisjs/lucid/schema'
import { SeasonStatus } from '../../app/type/interface.js'

export default class extends BaseSchema {
  protected tableName = 'seasons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('year')
      table.integer('nb_round')
      table.integer('current_round')
      table.timestamp('next_date')
      table.boolean('qualifying_past')
      table
        .enum('status', Object.values(SeasonStatus))
        .defaultTo(SeasonStatus.CREATED)
        .notNullable()
      table.json('pilots').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
