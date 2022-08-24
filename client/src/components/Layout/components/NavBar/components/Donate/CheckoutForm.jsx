import { useState } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button, Spacer, Snackbar } from 'shared/components'
import { formatCurrency, currencies } from 'shared/utils'
import style from './CheckoutForm.module.scss'

function CheckoutForm({
  currency,
  amount,
  onCloseModal,
}) {
  const stripe = useStripe()
  const elements = useElements()
  const { t } = useTranslation()
  const [isComplete, setIsComplete] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false)

  const handleChange = ({ complete }) => {
    setIsComplete(complete)
  }

  const handleSubmit = () => {
    setHasSubmitted(true)
    stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })
      .then((res) => {
        if (get(res, 'paymentIntent.status')) {
          onCloseModal(200)
        } else {
          setIsErrorMessageOpen(true)
        }
      })
      .catch(() => {
        setIsErrorMessageOpen(true)
      })
      .finally(() => {
        setHasSubmitted(false)
      })
  }

  const buttonText = hasSubmitted
    ? t('navbar.donate.modal.submit_button_sending')
    : t('navbar.donate.modal.submit_button', {
      amount: formatCurrency(amount, currency, true).humanReadable,
      symbol: currencies.USD.symbol,
    })

  return (
    <>
      <Snackbar
        severity="error"
        isOpen={isErrorMessageOpen}
        onClose={() => setIsErrorMessageOpen(false)}
      >
        {t('navbar.donate.modal.error')}
      </Snackbar>
      <form>
        <PaymentElement
          onChange={handleChange}
        />
        <Spacer />
        <div className={style.button_container}>
          <Button
            isDisabled={!isComplete || hasSubmitted}
            onClick={handleSubmit}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </>
  )
}

CheckoutForm.propTypes = {
  currency: PropTypes.oneOf(Object.keys(currencies)).isRequired,
  amount: PropTypes.number.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}

export default CheckoutForm
