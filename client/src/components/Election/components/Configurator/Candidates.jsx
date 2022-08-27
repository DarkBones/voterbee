import { useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { findIndex, cloneDeep } from 'lodash'
import { useTranslation } from 'react-i18next'
import { GoDiffAdded } from 'react-icons/go'
import { BiTrash } from 'react-icons/bi'
import { UserContext } from 'contexts'
import { Spacer, Button } from 'shared/components'
import { TextField } from 'shared/components/forms'
import { generateCandidateId } from 'shared/utils'

function Candidate({
  candidate,
  candidateCount,
  suggestionIndex,
  index,
  onChange,
  onAddCandidate,
  onDeleteCandidate,
  inputRef,
  userCandidateAllowance,
  isDisabled,
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

  const deleteButton = (
    <Button
      variant="icon-text"
      onClick={() => onDeleteCandidate(candidate.id)}
      isDisabled={isDisabled || (candidateCount < 3 && userCandidateAllowance === 0)}
      tabIndex={-1}
    >
      <BiTrash size={20} />
    </Button>
  )

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
        endAdornment={deleteButton}
        isDisabled={isDisabled}
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
  userCandidateAllowance,
  isDisabled,
}) {
  const lastCandidateRef = useRef(null)
  const user = useContext(UserContext)
  const { t } = useTranslation()

  useEffect(() => {
    if (candidates.length < 2 && userCandidateAllowance === 0) {
      const initialCandidates = candidates
      for (let i = candidates.length; i < 3; i += 1) {
        initialCandidates.push({
          name: '',
          id: generateCandidateId(initialCandidates),
          addedBy: user.addCandidateId,
        })
      }
      onChange('candidates', initialCandidates)
    }
  }, [candidates, onChange, userCandidateAllowance, user])

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
      addedBy: user.addCandidateId,
    })
    onChange('candidates', newCandidates, true)
  }

  const handleDeleteCandidate = (id, focusOnLast = false) => {
    const newCandidates = cloneDeep(candidates)
    newCandidates.splice(findIndex(candidates, (c) => c.id === id), 1)
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
          userCandidateAllowance={userCandidateAllowance}
          isDisabled={isDisabled}
        />
      ))}
      <Button
        onClick={handleAddCandidate}
        variant="secondary"
        isDisabled={isDisabled}
      >
        <GoDiffAdded size={23} />
        &nbsp;
        {t('elections.configure.candidate.add')}
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
  userCandidateAllowance: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

Candidate.defaultProps = {
  inputRef: null,
}

Candidates.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  suggestionIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  focusOnLastCandidate: PropTypes.bool.isRequired,
  userCandidateAllowance: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

export default Candidates
