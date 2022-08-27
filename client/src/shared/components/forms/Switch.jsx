import PropTypes from 'prop-types'
import {
  Switch as MUISwitch,
  FormControlLabel,
} from '@mui/material'

function Switch({
  checked,
  onChange,
  label,
  isDisabled,
}) {
  const switchComponent = (
    <MUISwitch
      checked={checked}
      onChange={onChange}
      disabled={isDisabled}
    />
  )
  return label.length === 0
    ? switchComponent
    : (
      <FormControlLabel
        control={switchComponent}
        label={label}
      />
    )
}

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
}

Switch.defaultProps = {
  onChange: () => { },
  label: '',
  isDisabled: false,
}

export default Switch
