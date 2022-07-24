import PropTypes from 'prop-types'
import { Alert as MUIAlert } from '@mui/material'

function Alert({
  children,
  severity,
}) {
  return (
    <MUIAlert
      severity={severity}
    >
      {children}
    </MUIAlert>
  )
}

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  severity: PropTypes.oneOf([
    'error',
    'warning',
    'info',
    'success',
  ]).isRequired,
}

export default Alert
