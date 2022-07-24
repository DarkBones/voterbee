import PropTypes from 'prop-types'
import { Snackbar as MUISnackbar } from '@mui/material'
import { Alert } from 'shared/components'

function Snackbar({
  children,
  duration,
  isOpen,
  onClose,
  severity,
}) {
  return (
    <MUISnackbar
      open={isOpen}
      autoHideDuration={duration * 1000}
      onClose={onClose}
    >
      <div>
        <Alert severity={severity}>
          {children}
        </Alert>
      </div>
    </MUISnackbar>
  )
}

Snackbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  severity: PropTypes.oneOf([
    'error',
    'warning',
    'info',
    'success',
  ]).isRequired,
}

Snackbar.defaultProps = {
  duration: 4,
}

export default Snackbar
