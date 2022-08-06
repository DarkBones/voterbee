import PropTypes from 'prop-types'

function Spacer({ size }) {
  const style = {
    height: `${size * 10}px`,
  }
  return <div style={style} />
}

Spacer.propTypes = {
  size: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
}

Spacer.defaultProps = {
  size: 2,
}

export default Spacer
