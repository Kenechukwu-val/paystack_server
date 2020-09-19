'use strict'

const Product = use('App/Models/Product')

class ProductController {
    async create_product ({ request, response }) {
        try {
            const { product_name, product_desc, product_amount, product_price } = request.only(['product_name', 'product_desc',
                 'product_amount', 'product_price'
            ])

            const products = await Product.create({ 
                product_name,
                product_desc,
                product_amount,
                product_price
            })

            return response.status(200).json({ message: 'Products Added Successfully', products })
            
        } catch (err) {
            console.log(err)
        }
    }

    async get_product ({ response }) {
        try {
            const products = await Product.all()

            return response.status(200).json({ message: 'Displaying all products', products })
            
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = ProductController
