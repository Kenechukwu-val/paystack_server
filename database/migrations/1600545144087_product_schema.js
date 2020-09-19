'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments().unique()
      table.string('product_name', 80).notNullable()
      table.string('product_desc', 254).notNullable()
      table.integer('product_amount').notNullable()
      table.integer('product_price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
