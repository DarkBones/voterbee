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
  tabIndex,
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
          {
            props: { variant: 'icon-text' },
            style: {
              backgroundColor: 'transparent',
              borderRadius: '100px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
              '&.Mui-disabled': {
                backgroundColor: 'transparent',
              },
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
        tabIndex={tabIndex}
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
    'icon-text',
  ]),
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
}

Button.defaultProps = {
  style: {},
  variant: 'contained',
  isDisabled: false,
  onClick: () => { },
  tabIndex: null,
}

export default Button
