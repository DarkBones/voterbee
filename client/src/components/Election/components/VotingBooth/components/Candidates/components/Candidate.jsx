import PropTypes from 'prop-types'

function Candidate({ candidate, index }) {
  return (
    <div>
      {candidate.name}
      {index}
    </div>
  )
}

Candidate.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

export default Candidate
