import React from 'react'
import { Button as MUIButton } from '@mui/material'

const Button = ({
  children,
  style,
  variant = "raised",
  onClick,
  disabled = false,
  danger = false,
  ...otherProps
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

  if (danger) {
    buttonStyle.backgroundColor = '#DC3545'
    buttonStyle.color = 'white'
  }

  return (
    <MUIButton
      style={buttonStyle}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </MUIButton>
  )
}

export default Button