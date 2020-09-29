const Axios = require('axios')

const Env = use('Env')

const key_secret = Env.get('PAYSTACK_KEY_SECRET')
const base_url = Env.get('PAYSTACK_BASE_URL')

const call = payload =>
  Axios({
  ...payload,
    baseURL: base_url,
    headers: {
      Authorization: `Bearer ${key_secret}`,
    },
    validateStatus: status => status >= 200 && status < 500,
  });
  

module.exports = {
    create_product: async ({ name, description, price, currency, quantity }) => {
        const data = await call ({
            url: '/product',
            method: 'POST',
            data: {
                name,
                description,
                price,
                currency,
                quantity
            },
        })

        return data
    },

    list_product: async () => {
        const { data } = await call ({
            url: '/product',
            method: 'GET'
        })
        return data
    },

    create_customer: async ({ email, first_name, last_name}) => {
        const data = await call ({
          url: '/customer',
          method: 'POST',
          data: {
            email,
            first_name,
            last_name
          }
        })

        return data
    }

}