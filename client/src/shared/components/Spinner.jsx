import PropTypes from 'prop-types'
import ScaleLoader from 'react-spinners/ScaleLoader'

function Spinner({
  color,
  size,
}) {
  return (
    <ScaleLoader
      color={color}
      height={size}
    />
  )
}

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

Spinner.defaultProps = {
  color: 'black',
  size: 35,
}

export default Spinner
