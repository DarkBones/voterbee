import React from 'react'
import { Modal, Box, Typography } from '@mui/material'
import Spacer from 'shared/Spacer'
import Stripe from './Stripe'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '1em 2em',
  borderRadius: '9px',
}

const DonateModal = ({
  open,
  value,
  onClose
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Donate
        </Typography>
        <Spacer />
        <div>
          <Stripe
            value={value}
          />
        </div>
      </Box>
    </Modal>
  )
}

export default DonateModal