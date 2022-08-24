const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

const createPaymentIntent = async ({ amount, currency }) => stripe.paymentIntents.create({
  amount,
  currency,
})
  .then((res) => Promise.resolve(res))
  .catch((err) => Promise.reject(err))

module.exports = { createPaymentIntent }
