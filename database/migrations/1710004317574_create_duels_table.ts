import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'duels'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('year').notNullable()
      table.integer('round').notNullable()
      table.integer('roundL').notNullable()
      table.timestamp('dateLimitProno').notNullable()
      table.timestamp('dateLimitBid').notNullable()
      table.boolean('computed').defaultTo(false)
      table.integer('pointPlayer1').nullable()
      table.integer('pointPlayer2').nullable()
      table.integer('user_league1_id').references('id').inTable('user_leagues')
      table.integer('user_league2_id').references('id').inTable('user_leagues')
      table.integer('league_id').references('id').inTable('leagues').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
