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
  cursor,
}) {
  const buttonStyle = {
    ...style,
  }

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            cursor,
            '&.Mui-disabled': {
              backgroundColor: styleVariables.disabled,
              color: styleVariables.disabled_text,
              boxShadow: styleVariables.box_shadow_disabled,
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
            '&:focus': {
              boxShadow: styleVariables.box_shadow,
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
              '&:focus': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
              '&.Mui-disabled': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
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
  cursor: PropTypes.string,
}

Button.defaultProps = {
  style: {},
  variant: 'contained',
  isDisabled: false,
  onClick: () => { },
  tabIndex: null,
  errors: [],
  cursor: 'pointer',
}

export default Button
