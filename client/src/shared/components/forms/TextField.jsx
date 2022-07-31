import PropTypes from 'prop-types'
import {
  TextField as MUITextField,
  createTheme,
  ThemeProvider,
} from '@mui/material'

function TextField({
  label,
  variant,
  onChange,
  placeholder,
  className,
  size,
  fullWidth,
}) {
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '&.with-button': {
              marginTop: '4px',
              width: 'calc(100% + 5px)',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '4px 0 0 4px',
                },
              },
            },
          },
        },
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <MUITextField
        label={label}
        variant={variant}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        size={className === 'with-button' ? 'small' : size}
        fullWidth={fullWidth}
      />
    </ThemeProvider>
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf([
    'outlined',
    'filled',
    'standard',
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.oneOf([
    'with-button',
  ]),
  size: PropTypes.oneOf([
    'small',
    'medium',
  ]),
  fullWidth: PropTypes.bool,
}

TextField.defaultProps = {
  label: '',
  variant: 'outlined',
  onChange: () => { },
  placeholder: '',
  className: '',
  size: 'small',
  fullWidth: true,
}

export default TextField
