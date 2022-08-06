import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { map, findIndex, cloneDeep } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Spacer, Button } from 'shared/components'
import { TextField } from 'shared/components/forms'
import { generateUniqueId } from 'shared/utils'

function Candidate({
  candidate,
  suggestionIndex,
  index,
  onChange,
}) {
  const { t, i18n } = useTranslation()
  const tPathBase = [
    'elections',
    'configure',
    'candidate',
  ].join('.')
  const tPathSuggestion = [
    tPathBase,
    `placeholder_${suggestionIndex}_${index}`,
  ].join('.')
  const tPathLabel = [
    tPathBase,
    'label',
  ].join('.')
  const label = `${t(tPathLabel)} ${index + 1}`
  const placeholder = i18n.exists(tPathSuggestion) ? t(tPathSuggestion) : label
  return (
    <>
      <TextField
        value={candidate.name}
        label={label}
        placeholder={placeholder}
        onChange={({ target: { value } }) => onChange(candidate.id, value)}
      />
      <Spacer />
    </>
  )
}

function Candidates({
  candidates,
  suggestionIndex,
  onChange,
}) {
  const generateCandidateId = (c) => generateUniqueId(map(c, 'id'), 8)

  useEffect(() => {
    if (candidates.length === 0) {
      const initialCandidates = []
      for (let i = 0; i < 3; i += 1) {
        initialCandidates.push({
          name: '',
          id: generateCandidateId(initialCandidates),
        })
      }
      onChange('candidates', initialCandidates)
    }
  }, [candidates, onChange])

  const handleChange = (id, value) => {
    const newCandidates = cloneDeep(candidates)
    newCandidates[findIndex(candidates, (c) => c.id === id)].name = value
    onChange('candidates', newCandidates)
  }

  const handleAddCandidate = () => {
    const newCandidates = cloneDeep(candidates)
    newCandidates.push({
      name: '',
      id: generateCandidateId(candidates),
    })
    onChange('candidates', newCandidates)
  }

  return (
    <div>
      {candidates.map((candidate, index) => (
        <Candidate
          candidate={candidate}
          key={candidate.id}
          suggestionIndex={suggestionIndex}
          index={index}
          onChange={handleChange}
        />
      ))}
      <Button
        onClick={handleAddCandidate}
      >
        ADD
      </Button>
    </div>
  )
}

Candidate.propTypes = {
  candidate: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  suggestionIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

Candidates.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  suggestionIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Candidates
