import PropTypes from 'prop-types'
import Candidate from './Candidate'

function CandidatesList({ candidates }) {
  return (
    <div>
      {candidates.map((candidate, index) => (
        <Candidate
          candidate={candidate}
          index={index}
          key={candidate.id}
        />
      ))}
    </div>
  )
}

CandidatesList.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}

export default CandidatesList
