'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Users routes
Route.group(() => { 
    Route.post('register', 'UserController.register')
    Route.post('login', 'UserController.login')
}).prefix('users')

//product routes
Route.group(() => { 
    Route.post('create_product', 'ProductController.create')
    Route.get('get_product', 'ProductController.get_product')
}).prefix('products')

//customer routes
Route.group(() => { 
    Route.post('create_customer', 'CustomerController.create_customer')
    Route.post('transaction', 'CustomerController.init_transaction')
    Route.post('transfer_recipient', 'CustomerController.transfer_recipient')
    Route.get(`verify/:reference`, 'CustomerController.verify_transaction')
    Route.get('list_banks', 'CustomerController.list_banks')
    Route.get('resolve', 'CustomerController.resolve_account_number')
}).prefix('customer')
