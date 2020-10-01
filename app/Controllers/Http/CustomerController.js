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

    async resolve_account_number ({ request, response }) {
        try {
            const { account_number, bank_code } = request.post()

            const res = await Paystack.resolve_account_number({ account_number, bank_code })

            if ( !res.status ) {
                return response.badRequest({
                    message: res.message
                })
            }

            return response.ok({
                message: 'Account Number resolved',
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
