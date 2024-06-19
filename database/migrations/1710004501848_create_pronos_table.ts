import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pronos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('year')
      table.integer('round')
      table.integer('roundL')
      table.timestamp('dateLimit')
      table.boolean('validated').defaultTo(false)
      table.boolean('computed').defaultTo(false)
      table.json('pronos').nullable()
      table.integer('points').nullable()
      table.integer('league_id').references('id').inTable('leagues')
      table.integer('duel_id').references('id').inTable('duels')
      table.integer('user_league_id').references('id').inTable('user_leagues')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
