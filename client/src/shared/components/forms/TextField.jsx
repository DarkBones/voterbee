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
  onEnter,
  onTab,
  onBackspace,
  value,
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

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === 13) {
      onEnter()
    } else if (keyCode === 9) {
      onTab()
    } else if (keyCode === 8) {
      onBackspace()
    }
  }

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
        onKeyDown={handleKeyDown}
        value={value}
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
  onEnter: PropTypes.func,
  onTab: PropTypes.func,
  onBackspace: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}

TextField.defaultProps = {
  label: '',
  variant: 'outlined',
  onChange: () => { },
  placeholder: '',
  className: null,
  size: 'medium',
  fullWidth: true,
  onEnter: () => { },
  onTab: () => { },
  onBackspace: () => { },
}

export default TextField
