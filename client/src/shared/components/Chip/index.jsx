import PropTypes from 'prop-types'
import { Chip as MUIChip, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import styleVariables from './Chip.module.scss'

function Chip({ label, color }) {
  const theme = createTheme({
    palette: {
      success: {
        main: styleVariables.primary,
      },
      info: {
        main: styleVariables.disabled,
        contrastText: styleVariables.disabled_text,
      },
      warning: {
        main: styleVariables.primary_hover,
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <MUIChip label={label} color={color} size="small" />
    </ThemeProvider>
  )
}

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning',
  ]),
}

Chip.defaultProps = {
  color: 'default',
}

export default Chip
