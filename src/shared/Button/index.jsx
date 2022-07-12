import React from 'react'
import { Button as MUIButton, Tooltip } from '@mui/material'

const Button = ({
  children,
  style,
  variant = "raised",
  onClick,
  disabled = false,
  danger = false,
  secondary = false,
  errors = [],
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

  if (disabled || errors.length > 0) {
    buttonStyle.backgroundColor = 'lightgrey'
    buttonStyle.color = 'grey'
  } else if (danger) {
    buttonStyle.backgroundColor = '#DC3545'
    buttonStyle.color = 'white'
  } else if (secondary) {
    buttonStyle.backgroundColor = '#007BFF'
  }

  const button = (
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

  return errors.length === 0
    ? button
    : (
      <Tooltip title={errors.join(', ')} placement="top" arrow>
        {button}
      </Tooltip>
    )
}

export default Button