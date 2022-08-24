import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  TextField as MUITextField,
  InputAdornment,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import { currencies } from 'shared/utils'

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
  onShiftTab,
  onBackspace,
  value,
  autoFocus,
  inputRef,
  endAdornment,
  onClick,
  isDisabled,
  type,
  currency,
  onBlur,
}) {
  const textRef = useRef(null)
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            minWidth: '50px',
            '&.with-button': {
              marginTop: '4px',
              width: 'calc(100% + 5px)',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '4px 0 0 4px',
                },
              },
            },
            '&.small-height': {
              '& .MuiFilledInput-root': {
                height: '35px',
                borderRadius: '0',
                '& .MuiFilledInput-input': {
                  marginTop: '-15px',
                },
              },
            },
          },
        },
      },
    },
  })

  const [keysDown, setKeysDown] = useState({
    16: false,
  })
  useEffect(() => {
    setKeysDown({
      16: false,
    })

    const ref = textRef.current

    const handleWheel = (e) => e.preventDefault()
    ref.addEventListener('wheel', handleWheel)
    return () => {
      ref.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const handleKeyDown = (e) => {
    if (Object.keys(keysDown).includes(e.keyCode.toString())) {
      setKeysDown({
        ...keysDown,
        [e.keyCode]: true,
      })
    }

    if (e.keyCode === 13) {
      onEnter(e)
    } else if (e.keyCode === 8) {
      onBackspace(e)
    } else if (e.keyCode === 9) {
      if (keysDown[16]) {
        onShiftTab(e)
      } else {
        onTab(e)
      }
    }
  }

  const handleKeyUp = ({ keyCode }) => {
    if (Object.keys(keysDown).includes(keyCode.toString())) {
      setKeysDown({
        ...keysDown,
        [keyCode]: false,
      })
    }
  }

  const inputProps = {}
  if (endAdornment) {
    inputProps.endAdornment = <InputAdornment position="end">{endAdornment}</InputAdornment>
  }

  const handleBlur = () => {
    setKeysDown({
      16: false,
    })

    if (onBlur) {
      onBlur()
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
        onKeyUp={handleKeyUp}
        value={value}
        autoFocus={autoFocus}
        inputRef={inputRef}
        onBlur={handleBlur}
        InputProps={inputProps}
        onClick={onClick}
        disabled={isDisabled}
        type={currency ? 'number' : type}
        ref={textRef}
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
    'small-height',
  ]),
  size: PropTypes.oneOf([
    'small',
    'medium',
  ]),
  fullWidth: PropTypes.bool,
  onEnter: PropTypes.func,
  onTab: PropTypes.func,
  onShiftTab: PropTypes.func,
  onBackspace: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  autoFocus: PropTypes.bool,
  inputRef: PropTypes.shape({}),
  endAdornment: PropTypes.shape({}),
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  type: PropTypes.string,
  currency: PropTypes.oneOf(Object.keys(currencies)),
  onBlur: PropTypes.func,
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
  onShiftTab: () => { },
  onBackspace: () => { },
  autoFocus: false,
  inputRef: null,
  endAdornment: null,
  onClick: () => { },
  isDisabled: false,
  type: 'text',
  currency: null,
  onBlur: () => { },
}

export default TextField
