'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments().unique()
      table.string('name', 80).notNullable()
      table.string('description', 254).notNullable()
      table.integer('price').notNullable()
      table.string('currency').notNullable()
      table.string('quantity').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
