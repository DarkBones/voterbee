import React, { useEffect, useState, useRef } from 'react'
import { Button as MUIButton } from '@mui/material'
import Spinner from 'shared/Spinner'

const Button = ({
  children,
  style,
  variant = "raised",
  onClick,
  disabled = false,
  loading = true,
}) => {
  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)
  const ref = useRef(null)
  const buttonStyle = {
    backgroundColor: 'yellow',
    color: 'black',
    fontWeight: '600',
    borderRadius: '8px',
    boxShadow: '2px 2px 0px 1px #000000',
    width: `${width ? `${width}px` : 'auto'}`,
    height: `${height ? `${height}px` : 'auto'}`,
    ...style,
  }
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth)
      setHeight(ref.current.offsetHeight)
    }
  }, [children])

  if (disabled && !loading) {
    buttonStyle.backgroundColor = 'lightgrey'
    buttonStyle.color = 'grey'
  }

  return (
    <MUIButton
      style={buttonStyle}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {loading && (
        <Spinner />
      )}
      {!loading && (
        children
      )}
    </MUIButton>
  )
}

export default Button