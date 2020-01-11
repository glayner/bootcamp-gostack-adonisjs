'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UpdateTaskSchema extends Schema {
  up () {
    this.table('tasks', (table) => {
      table.string('type').defaultTo('public').notNullable()
    })
  }

  down () {
    this.table('tasks', (table) => {
      table.dropColumn('type')
    })
  }
}

module.exports = UpdateTaskSchema
