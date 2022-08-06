import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { map, findIndex, cloneDeep } from 'lodash'
import { useTranslation } from 'react-i18next'
import { GoDiffAdded } from 'react-icons/go'
import { Spacer, Button } from 'shared/components'
import { TextField } from 'shared/components/forms'
import { generateUniqueId } from 'shared/utils'

function Candidate({
  candidate,
  candidateCount,
  suggestionIndex,
  index,
  onChange,
  onAddCandidate,
  onDeleteCandidate,
  inputRef,
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
  const handleTab = (e) => {
    if (index === candidateCount - 1) {
      e.preventDefault()
      onAddCandidate()
    }
  }

  const handleBackspace = (e) => {
    if (index === candidateCount - 1) {
      if (candidate.name === '') {
        e.preventDefault()
        onDeleteCandidate(candidate.id, true)
      }
    }
  }

  return (
    <>
      <TextField
        value={candidate.name}
        label={label}
        placeholder={placeholder}
        onChange={({ target: { value } }) => onChange(candidate.id, value)}
        onTab={handleTab}
        onBackspace={handleBackspace}
        inputRef={inputRef}
      />
      <Spacer />
    </>
  )
}

function Candidates({
  candidates,
  suggestionIndex,
  onChange,
  focusOnLastCandidate,
}) {
  const generateCandidateId = (cs) => generateUniqueId(map(cs, 'id'), 8)
  const lastCandidateRef = useRef(null)

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

  useEffect(() => {
    if (lastCandidateRef.current && focusOnLastCandidate) {
      lastCandidateRef.current.focus()
    }
  }, [lastCandidateRef, focusOnLastCandidate, candidates.length])

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
    onChange('candidates', newCandidates, true)
  }

  const handleDeleteCandidate = (id, focusOnLast = false) => {
    if (candidates.length < 3) return

    const newCandidates = cloneDeep(candidates)
    newCandidates.splice(findIndex(candidates, (c) => c.id === id))
    onChange('candidates', newCandidates, focusOnLast)
  }

  return (
    <div>
      {candidates.map((candidate, index) => (
        <Candidate
          candidate={candidate}
          candidateCount={candidates.length}
          key={candidate.id}
          suggestionIndex={suggestionIndex}
          index={index}
          onChange={handleChange}
          onAddCandidate={handleAddCandidate}
          onDeleteCandidate={handleDeleteCandidate}
          inputRef={index === candidates.length - 1 ? lastCandidateRef : null}
        />
      ))}
      <Button
        onClick={handleAddCandidate}
      >
        <GoDiffAdded size={23} />
      </Button>
    </div>
  )
}

Candidate.propTypes = {
  candidate: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  candidateCount: PropTypes.number.isRequired,
  suggestionIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddCandidate: PropTypes.func.isRequired,
  onDeleteCandidate: PropTypes.func.isRequired,
  inputRef: PropTypes.PropTypes.shape({}),
}

Candidate.defaultProps = {
  inputRef: null,
}

Candidates.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  suggestionIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  focusOnLastCandidate: PropTypes.bool.isRequired,
}

export default Candidates
