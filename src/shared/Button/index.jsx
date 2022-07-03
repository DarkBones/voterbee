import React from 'react'
import { Button as MUIButton } from '@mui/material'
import { borderRadius } from '@mui/system'

const Button = ({
  children,
  style,
  variant = "raised",
  onClick,
  disabled = false,
}) => {
  const buttonStyle = {
    backgroundColor: 'yellow',
    color: 'black',
    fontWeight: '600',
    borderRadius: '8px',
    boxShadow: '2px 2px 0px 1px #000000',
    ...style,
  }

  if (disabled) {
    buttonStyle.backgroundColor = 'lightgrey'
    buttonStyle.color = 'grey'
  }

  return (
    <MUIButton
      style={buttonStyle}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MUIButton>
  )
}

export default Button