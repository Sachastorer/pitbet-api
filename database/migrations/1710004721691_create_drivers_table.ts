import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'drivers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_api').unique()
      table.string('driver_id').unique()
      table.string('name')
      table.string('abbr')
      table.integer('price')
      table.integer('rank')
      table.integer('note')
      table.integer('salary')
      table.string('team')
      table.boolean('active')
      table.string('color')
      table.string('nationality')
      table.integer('number')
      table.string('date_of_birth')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
