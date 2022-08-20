import PropTypes from 'prop-types'
import {
  Switch as MUISwitch,
  FormControlLabel,
} from '@mui/material'

function Switch({
  checked,
  onChange,
  label,
}) {
  const switchComponent = (
    <MUISwitch
      checked={checked}
      onChange={onChange}
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
}

Switch.defaultProps = {
  onChange: () => { },
  label: '',
}

export default Switch
