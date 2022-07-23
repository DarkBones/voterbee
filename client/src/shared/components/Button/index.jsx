import PropTypes from 'prop-types'
import { Button as MUIButton, createTheme, ThemeProvider } from '@mui/material'
import styleVariables from './Button.module.scss'

function Button({
  children,
  style,
  variant,
  isDisabled,
  onClick,
}) {
  // const variantStyles = {
  //   '&.MuiButton-root': {
  //     border: '2px solid black',
  //   },
  //   '&.MuiButton-raised': {
  //     backgroundColor: 'blue',
  //   },
  // }

  const buttonStyle = {
    ...style,
  }

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              backgroundColor: styleVariables.disabled,
            },
            backgroundColor: styleVariables.primary,
            color: styleVariables.text,
            boxShadow: styleVariables.box_shadow,
            fontWeight: styleVariables.font_weight,
            '&:hover': {
              backgroundColor: styleVariables.primary_hover,
              boxShadow: styleVariables.box_shadow_hover,
            },
          },
        },
        variants: [
          {
            props: { variant: 'test' },
            style: {
              backgroundColor: 'red',
            },
          },
        ],
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <MUIButton
        style={buttonStyle}
        variant={variant}
        disabled={isDisabled}
        onClick={onClick}
      >
        {children}
      </MUIButton>
    </ThemeProvider>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.shape({}),
  variant: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  style: {},
  variant: 'contained',
  isDisabled: false,
  onClick: () => { },
}

export default Button
