'use strict'

const Paystack = use('App/Helpers/Paystack')

class CustomerController {
    async create_customer ({ request, response }) {
        try {
            const { email, first_name, last_name } = request.post()

            const res = await Paystack.create_customer({ email, first_name, last_name });

            if ( !res.status ) {
                return response.badRequest({
                    message: res.message
                })
            }

            return response.ok({
                message: 'Customer created',
                data: res.data
            })
            
        } catch (err) {
            response.internalServerError({
                message: e.message,
                data: e.stack,
            });      
        }
    }
}

module.exports = CustomerController
