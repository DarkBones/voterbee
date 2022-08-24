import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { post, currencies } from 'shared/utils'
import {
  Modal,
  Spinner,
  Spacer,
} from 'shared/components'
import CheckoutForm from './CheckoutForm'
import style from './DonateModal.module.scss'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

function DonateModal({
  isOpen,
  amount: initialAmount,
  currency: initialCurrency,
  onClose,
}) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingPI, setIsFetchingPI] = useState(false)
  const [clientSecret, setClientSecret] = useState()
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState('')

  useEffect(() => {
    if (isOpen && !isFetchingPI) {
      setIsFetchingPI(true)
      post('payment_intents/create', { amount: initialAmount, currency: initialCurrency })
        .then(({
          amount: piAmount,
          currency: piCurrency,
          client_secret: piClientSecret,
        }) => {
          setAmount(piAmount)
          setCurrency(piCurrency)
          setClientSecret(piClientSecret)
          setIsLoading(false)
        })
        .catch(() => {
          setIsFetchingPI(false)
          onClose(400)
        })
    }
  }, [amount, currency, initialAmount, initialCurrency, isFetchingPI, isOpen, onClose])

  const handleClose = (status = 0) => {
    setIsFetchingPI(false)
    onClose(status)
  }

  const modalContent = isLoading
    ? (
      <>
        <Spacer />
        <div className={style.spinner_container}>
          <Spinner />
        </div>
      </>
    )
    : (
      <>
        <Spacer />
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
          key={clientSecret}
        >
          <CheckoutForm
            currency={currency}
            amount={amount}
            onCloseModal={handleClose}
          />
        </Elements>
      </>
    )

  return (
    <Modal
      isOpen={isOpen}
      title={t('navbar.donate.modal.title')}
      onClose={handleClose}
      height={350}
    >
      {modalContent}
    </Modal>
  )
}

DonateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.oneOf(Object.keys(currencies)).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default DonateModal
