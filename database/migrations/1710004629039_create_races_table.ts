import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'races'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('year')
      table.integer('round')
      table.boolean('past')
      table.string('name')
      table.string('circuit')
      table.string('locality')
      table.string('country')
      table.integer('id_api').nullable()
      table.timestamp('date')
      table.json('ranking').nullable()
      table.integer('season_id').references('id').inTable('seasons')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
