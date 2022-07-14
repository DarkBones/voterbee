import React, { useEffect, useState } from 'react'
import {
  Elements,
  ElementsConsumer,
  CardElement,
  PaymentElement,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Button from 'shared/Button'
import Spacer from 'shared/Spacer'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({ value }) => {
  const [isValid, setIsValid] = useState(false)
  const handleChange = ({ error, complete }) => {
    console.log(error, complete)
    setIsValid(!error && complete)
  }
  return (
    <>
      <CardElement onChange={handleChange} />
      <Spacer />
      <Button
        disabled={!isValid}
      >
        Donate ${parseFloat(value).toFixed(2)}
      </Button>
    </>
  )
}

const Stripe = ({ value }) => {

  const options = {
    clientSecret: process.env.REACT_APP_STRIPE_SECRET_KEY,
  }

  return (
    <Elements
      stripe={stripePromise}
    // options={options}
    >
      <PaymentForm
        value={value}
      />
    </Elements>
  )
}

export default Stripe