import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bids'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('year')
      table.integer('round')
      table.integer('roundL')
      table.timestamp('dateLimit')
      table.integer('budget').defaultTo(20)
      table.boolean('validated').defaultTo(false)
      table.boolean('computed').defaultTo(false)
      table.string('pilot1').nullable()
      table.string('pilot2').nullable()
      table.string('pilot3').nullable()
      table.string('pilot4').nullable()
      table.integer('bid1').nullable()
      table.integer('bid2').nullable()
      table.integer('bid3').nullable()
      table.integer('bid4').nullable()
      table.string('pilotBought1').nullable()
      table.string('pilotBought2').nullable()
      table.integer('pointsPilot1').nullable()
      table.integer('pointsPilot2').nullable()
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
