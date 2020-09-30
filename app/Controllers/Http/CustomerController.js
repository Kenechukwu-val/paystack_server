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
                message: err.message,
                data: err.stack,
            });      
        }
    }

    async init_transaction ({ request, response }) {
        try {
            const { email, currency } =  request.post()

            const res = await Paystack.initialize_transaction({ email, currency })

            if ( !res.status ) {
                return response.badRequest({
                    message: res.message
                })
            }

            return response.ok ({
                message: 'Authorization URL created',
                data: res.data
            })
            
        } catch (err) {
            response.internalServerError({
                message: err.message,
                data: err.stack
            })
        }
    }

    async verify_transaction ({ response, params }) {
        try {
            const  reference  = params

            const res = await Paystack.verify_transaction(reference)

            if ( !res.status ) {
                return response.badRequest({
                    message: res.message
                })
            }

            return response.ok({
                message: 'Verification successful',
                data: res.data
            })
            
        } catch (err) {
            response.internalServerError({
                message: err.message,
                data: err.stack
            })
        }
    }

    async list_banks ({ response }) {
        try {
            const res = await Paystack.list_banks()

            if ( !res.status ) {
                return response.badRequest({
                    message: res.message
                })
            }

            return response.ok({
                message: 'Banks retrieved',
                data: res.data
            })
            
        } catch (err) {
            response.internalServerError({
                message: err.message,
                data: err.stack,
            });

        }
    }

    async list_providers ({ response }) {
        try {

            const res = await Paystack.list_providers()

            if ( !res.status ) {
                return response.badRequest({
                    message: res.message
                })
            }

            return response.ok({
                message: 'NUBAN Providers retrieved successfully',
                data: res.data
            })
            
        } catch (err) {
            response.internalServerError({
                message: err.message,
                data: err.stack,
            });
        }
    }

    async dedicated_account ({ request, response })  {
        try {
            const { customer, preffered_bank } = request.post()

            const res = await Paystack.dedicated_account({ customer, preffered_bank })

            if ( !res.status ) {
                return response.badRequest({
                    message: res.message
                })
            }

            return response.ok({
                message: 'NUBAN successfully created',
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

module.exports = CustomerController
