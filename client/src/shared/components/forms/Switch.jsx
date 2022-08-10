import PropTypes from 'prop-types'
import { Switch as MUISwitch } from '@mui/material'

function Switch({
  checked,
  onChange,
}) {
  return (
    <MUISwitch
      checked={checked}
      onChange={onChange}
    />
  )
}

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
}

Switch.defaultProps = {
  onChange: () => { },
}

export default Switch
