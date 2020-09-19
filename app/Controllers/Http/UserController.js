'use strict'

const User = use('App/Models/User')

class UserController {
    async register ({ request, response }) {
        try {
            const { first_name, last_name, email, password } = request.only(['first_name', 'last_name', 'email', 'password'])

            const user = await User.create({ 
                first_name,
                last_name,
                email,
                password
            })

            return response.status(200).json({ message: 'User has been created', user })
            
        } catch (err) {
            console.log(err)
        }
    }

    async login ({ request, response, auth }) {
        try {
            const { email, password } = request.only(['email', 'password'])

            const token = await auth.attempt(email, password)

            return response.status(200).json({ message: 'Login successful', token })
            
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = UserController
