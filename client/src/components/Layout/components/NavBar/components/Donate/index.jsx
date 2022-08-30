import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Grid, Snackbar } from 'shared/components'
import { TextField } from 'shared/components/forms'
import { formatCurrency } from 'shared/utils'
import DonateModal from './DonateModal'
import style from './Donate.module.scss'

function Donate() {
  const { t } = useTranslation()
  const buttonRef = useRef(null)
  const [buttonWidth, setButtonWidth] = useState(0)
  const [amount, setAmount] = useState('10.00')
  const [amountCents, setAmountCents] = useState(1000)
  const [hasClickedButton, setHasClickedButton] = useState(false)
  const [donateModalOpen, setDonateModalOpen] = useState(false)
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false)
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false)

  useEffect(() => {
    setButtonWidth(buttonRef.current.offsetWidth)
  }, [buttonRef])

  const handleBlur = () => {
    setAmount(
      formatCurrency(amount, 'USD').humanReadable,
    )
  }

  const handleChange = ({ target: { value } }) => {
    setAmount(value)
    setAmountCents(
      formatCurrency(value, 'USD').cents,
    )
  }

  const handleClickDonate = () => {
    setHasClickedButton(true)
    setDonateModalOpen(true)
  }

  const handleCloseModal = (status = 0) => {
    setDonateModalOpen(false)
    setHasClickedButton(false)
    if (status === 200) {
      setIsSuccessMessageOpen(true)
    } else if (status === 400) {
      setIsErrorMessageOpen(true)
    }
  }

  return (
    <>
      <Snackbar
        severity="error"
        isOpen={isErrorMessageOpen}
        onClose={() => setIsErrorMessageOpen(false)}
      >
        {t('navbar.donate.modal.error')}
      </Snackbar>
      <Snackbar
        severity="success"
        isOpen={isSuccessMessageOpen}
        onClose={() => setIsSuccessMessageOpen(false)}
      >
        {t('navbar.donate.modal.thank_you')}
      </Snackbar>
      <DonateModal
        isOpen={donateModalOpen}
        amount={amountCents}
        currency="USD"
        onClose={handleCloseModal}
      />
      <div className={style.donate_container}>
        <Grid container spacing={0}>
          <Grid xs>
            <TextField
              placeholder="10.00"
              className="with-button"
              currency="USD"
              onChange={handleChange}
              value={amount}
              onBlur={handleBlur}
              onEnter={handleClickDonate}
            />
          </Grid>
          <Grid width={buttonWidth}>
            <div ref={buttonRef}>
              <Button
                variant="with-input"
                style={{ whiteSpace: 'nowrap' }}
                onClick={handleClickDonate}
                isDisabled={hasClickedButton || amountCents < 50}
              >
                {t('navbar.donate.button')}
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Donate
