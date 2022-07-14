import React, { useState } from 'react'
import TextField from 'shared/FormControl/TextField'
import Button from 'shared/Button'
import InputAdornment from '@mui/material/InputAdornment'

import DonateModal from './DonateModal'

const Donate = () => {
  const [value, setValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const formatValue = () => {
    setValue(parseFloat(value).toFixed(2))
  }

  const handleKeyDown = (e) => {
    if (e.keyCode !== 13) return
    setModalOpen(true)
  }

  const donateButton = (
    <InputAdornment position="end" style={{
      marginRight: '-10px',
      marginTop: '-2px',
    }}>
      <Button
        onClick={() => setModalOpen(true)}
        edge="end"
      >
        Donate
      </Button>
    </InputAdornment>
  )

  return (
    <div style={{ maxWidth: '200px', margin: '0 auto' }}>
      <DonateModal
        open={true}
        value={'10.00'}
        onClose={() => setModalOpen(false)}
      />
      <TextField
        type="number"
        size="small"
        placeholder="10.00"
        onBlur={formatValue}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          endAdornment: donateButton,
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default Donate