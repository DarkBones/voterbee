import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { generateUniqueId } from 'shared/utils'

function Candidate({ candidate, suggestionIndex }) {
  return (
    <div>
      CANDIDATE
      {' '}
      {candidate}
      {suggestionIndex}
    </div>
  )
}

function Candidates({
  candidates,
  suggestionIndex,
  onChange,
}) {
  useEffect(() => {
    if (candidates.length === 0) {
      const initialCandidates = []
      for (let i = 0; i < 3; i += 1) {
        initialCandidates.push({
          name: '',
          id: generateUniqueId(map(initialCandidates, 'id'), 8),
        })
      }
      onChange('candidates', initialCandidates)
    }
  }, [candidates, onChange])

  return (
    <div>
      {candidates.map((candidate) => (
        <Candidate
          candidate={candidate.name}
          key={candidate.id}
          suggestionIndex={suggestionIndex}
        />
      ))}
    </div>
  )
}

Candidate.propTypes = {
  candidate: PropTypes.string.isRequired,
  suggestionIndex: PropTypes.number.isRequired,
}

Candidates.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  suggestionIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Candidates
