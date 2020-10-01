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
    },

    initialize_transaction: async ({ email, currency }) => {
      const data = await call ({
        url: '/transaction/initialize',
        method: 'POST',
        data: {
          email,
          amount: 50 * 100,
          currency
        }
      })

      return data
    },

    verify_transaction: async ({ reference }) => {
      const data = await call ({
        url: `/transaction/verify/${reference}`,
        method: 'GET'
      })

      return data
    },

    list_banks: async () => {
      const { data } = await call ({
        url: '/bank',
        method: 'GET'
      })

      return data
    },

    resolve_account_number: async({ account_number, bank_code }) => {
      const { data } = await call ({
        url: `/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
        method: 'GET'
      })

      return data
    },

    transfer_recipient: async({ name, account_number, bank_code, currency }) => {
      const { data } = await call ({
        url: '/transferrecipient',
        method: 'POST',
        data: {
          name,
          account_number,
          bank_code,
          currency,
          type: 'nuban'
        }
      })

      return data
    }

}