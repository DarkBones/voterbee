import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Grid } from 'shared/components'
import { TextField } from 'shared/components/forms'
import { formatCurrency } from 'shared/utils'
import style from './Donate.module.scss'

function Donate() {
  const { t } = useTranslation()
  const buttonRef = useRef(null)
  const [buttonWidth, setButtonWidth] = useState(0)
  const [amount, setAmount] = useState('10.00')
  const [amountCents, setAmountCents] = useState(0)

  useEffect(() => {
    setButtonWidth(buttonRef.current.offsetWidth)
  }, [buttonRef])

  const handleBlur = () => {
    setAmount(
      formatCurrency(amount, 'USD').humanReadable,
    )
    console.log(amountCents)
  }

  const handleChange = ({ target: { value } }) => {
    setAmount(value)
    setAmountCents(
      formatCurrency(value, 'USD').cents,
    )
  }

  return (
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
          // onEnter={handleJoinElection}
          />
        </Grid>
        <Grid width={buttonWidth}>
          <div ref={buttonRef}>
            <Button
              variant="with-input"
            // onClick={handleJoinElection}
            >
              {t('navbar.donate.button')}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Donate
