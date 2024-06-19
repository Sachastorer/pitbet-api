import { BaseSchema } from '@adonisjs/lucid/schema'
import { LeagueStatus } from '../../app/type/interface.js'

export default class extends BaseSchema {
  protected tableName = 'leagues'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('code').unique()
      table.integer('year')
      table.integer('firstRound')
      table.integer('nbroundL')
      table.integer('currentroundL').defaultTo(1)
      table
        .enum('status', Object.values(LeagueStatus))
        .defaultTo(LeagueStatus.CREATED)
        .notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
