import PropTypes from 'prop-types'
import {
  Button as MUIButton,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import { Tooltip } from 'shared/components'
import styleVariables from './Button.module.scss'

function Button({
  children,
  style,
  variant,
  isDisabled,
  onClick,
  tabIndex,
  errors,
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
              minWidth: '0',
              color: styleVariables.icon_button,
              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
              '&.Mui-disabled': {
                backgroundColor: 'transparent',
              },
            },
          },
          {
            props: { variant: 'secondary' },
            style: {
              backgroundColor: styleVariables.secondary,
              color: styleVariables.paper,
              '&:hover': {
                backgroundColor: styleVariables.secondary_hover,
              },
            },
          },
        ],
      },
    },
  })

  const button = (
    <ThemeProvider theme={theme}>
      <MUIButton
        style={buttonStyle}
        variant={variant}
        disabled={isDisabled || errors.length > 0}
        onClick={onClick}
        tabIndex={tabIndex}
      >
        {children}
      </MUIButton>
    </ThemeProvider>
  )

  return errors.length === 0
    ? button
    : (
      <Tooltip
        title={errors.join(', ')}
      >
        <div>
          {button}
        </div>
      </Tooltip>
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
    'secondary',
  ]),
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  errors: PropTypes.arrayOf(PropTypes.string),
}

Button.defaultProps = {
  style: {},
  variant: 'contained',
  isDisabled: false,
  onClick: () => { },
  tabIndex: null,
  errors: [],
}

export default Button
