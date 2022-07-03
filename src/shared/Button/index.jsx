import React from 'react'
import { Button as MUIButton } from '@mui/material'
import { borderRadius } from '@mui/system'

const Button = ({ children, style, variant = "raised", onClick }) => {
  const buttonStyle = {
    backgroundColor: 'yellow',
    color: 'black',
    fontWeight: '600',
    borderRadius: '8px',
    boxShadow: '2px 2px 0px 1px #000000',
    ...style,
  }

  return (
    <MUIButton style={buttonStyle} variant={variant} onClick={onClick}>
      {children}
    </MUIButton>
  )
}

export default Button