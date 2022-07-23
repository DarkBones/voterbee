import PropTypes from 'prop-types'
import { Button as MUIButton } from '@mui/material'

function Button({
  children,
  style,
  variant,
}) {
  const variantStyles = {
    '&.MuiButton-root': {
      border: '2px solid black',
    },
    '&.MuiButton-raised': {
      backgroundColor: 'blue',
    },
  }

  const buttonStyle = {
    backgroundColor: 'grey',
    ...style,
  }
  return (
    <MUIButton
      sx={variantStyles}
      style={buttonStyle}
      variant={variant}
    >
      {children}
    </MUIButton>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.shape({}),
  variant: PropTypes.string,
}

Button.defaultProps = {
  style: {},
  variant: 'raised',
}

export default Button
