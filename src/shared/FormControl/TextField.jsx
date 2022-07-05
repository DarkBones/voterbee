import React from 'react'
import { TextField as MUITextField } from '@mui/material'

const TextField = ({ label, variant = 'outlined', onChange, placeholder, ...otherProps }) => {
  return (
    <MUITextField
      label={label}
      variant={variant}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth
      {...otherProps}
    />
  )
}

export default TextField