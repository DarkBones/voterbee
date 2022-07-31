import PropTypes from 'prop-types'
import {
  Button as MUIButton,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import styleVariables from './Button.module.scss'

function Button({
  children,
  style,
  variant,
  isDisabled,
  onClick,
}) {
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
            borderRadius: '4px',
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
            props: { variant: 'with-input' },
            style: {
              borderRadius: '0 4px 4px 0',
              marginTop: '3px',
              height: '40px',
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
  variant: PropTypes.oneOf([
    'contained',
    'outlined',
    'text',
    'with-input',
  ]),
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
