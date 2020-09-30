'use strict'

const Paystack = use('App/Helpers/Paystack')

// const Product = use('App/Models/Product')

class ProductController {
    async create ({ request,response }) {
        try {
            const { name, description, price, currency, quantity } = request.post()
            let res = await Paystack.create_product({name, description, price, currency, quantity})

            if ( !res.status ) {
                return response.badRequest({
                    message:res.message
                })
            }

            return response.ok({
                message: 'Product successfully created',
                data: res.data
            })

            // const product = await Product.create({
            //     name: res['data']['name'],
            //     description: res['data']['description'],
            //     price: res['data']['price'],
            //     currency: res['data']['currency']
            // })

            // return response.ok({
            //     message: 'Product successfully created',
            //     data: product
            // })
        } catch (err) {
            response.internalServerError({
                message: err.message,
                data: err.stack,
            });
        }
    }

    async get_product ({ response }) {
        try {
            const res = await Paystack.list_product()

            if ( !res.status ) {
                return response.badRequest({
                    message: res.message
                })
            }

            return response.ok({
                message: 'Products retrieved',
                data: res.data
            })
            
        } catch (err) {
            response.internalServerError({
                message: err.message,
                data: err.stack,
            });

        }
    }
}

module.exports = ProductController
