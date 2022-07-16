import React from 'react'
import { Switch as MUISwitch } from '@mui/material'

const Switch = ({ checked, onChange, ...otherProps }) => {
  return (
    <MUISwitch
      checked={checked}
      onChange={onChange}
      {...otherProps}
    />
  )
}

export default Switch