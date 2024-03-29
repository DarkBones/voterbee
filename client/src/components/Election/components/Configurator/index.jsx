import {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  ref,
  update,
} from 'firebase/database'
import { DbContext, UserContext } from 'contexts'
import {
  debounce,
  get,
} from 'lodash'
import { useTranslation } from 'react-i18next'
import { Panel, Spacer, Button } from 'shared/components'
import { TextField } from 'shared/components/forms'
import Candidates from './Candidates'
import AdvancedOptions from './AdvancedOptions'

function Configurator({ election }) {
  const { t } = useTranslation()
  const { state } = useLocation()
  const db = useContext(DbContext)
  const user = useContext(UserContext)
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [focusOnLastCandidate, setFocusOnLastCandidate] = useState(false)
  const [config, setConfig] = useState(election)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    setSuggestionIndex(Math.floor(Math.random() * 4))
  }, [])

  const uploadConfig = useRef(
    debounce(({
      name = '',
      candidates = [],
      userCandidateAllowance = 0,
      usersMustProvideName = true,
    }) => {
      update(ref(db, `elections/${election.fullId}`), {
        name,
        candidates: candidates.filter((c) => get(c, 'name', '').length > 0),
        userCandidateAllowance,
        usersMustProvideName,
      })
    }, 300),
  ).current

  const handleChange = (key, value, focusOnLast = false) => {
    const newConfig = {
      ...config,
      [key]: value,
    }

    setConfig(newConfig)
    setFocusOnLastCandidate(focusOnLast)
    uploadConfig(newConfig)
  }

  useEffect(() => {
    const newConfig = {}
    newConfig.name = get(state, 'name', '')
    newConfig.candidates = get(state, 'candidates')
    newConfig.usersMustProvideName = get(state, 'usersMustProvideName', true)

    if (state && Object.keys(state).length > 0) {
      setConfig(newConfig)
      uploadConfig(newConfig)
      window.history.replaceState({}, document.title)
    }
  }, [state, uploadConfig])

  useEffect(() => {
    const newErrors = []
    if (get(config, 'name', '').length === 0) {
      newErrors.push(t('elections.configure.errors.no_title'))
    }

    if (get(config, 'userCandidateAllowance', 0) === 0) {
      if (get(config, 'candidates', [{ name: '' }]).filter((c) => c.name.length > 0).length < 2) {
        newErrors.push(t('elections.configure.errors.not_enough_candidates'))
      }
    }

    setErrors(newErrors)
  }, [config, t])

  const handleStartElection = () => {
    update(ref(db, `elections/${election.fullId}`), {
      isConfigured: true,
    })
  }

  return (
    <>
      <Panel>
        <h3>{t('elections.configure.title')}</h3>
        <TextField
          label={t('elections.configure.name.label')}
          placeholder={t(`elections.configure.name.placeholder_${suggestionIndex}`)}
          value={get(config, 'name', '')}
          onChange={({ target: { value } }) => handleChange('name', value)}
          autoFocus
          isDisabled={election.creator !== user.id}
        />
        <Spacer />
        <h4>{t('elections.configure.candidate.name')}</h4>
        <Candidates
          candidates={get(config, 'candidates', [])}
          suggestionIndex={suggestionIndex}
          onChange={handleChange}
          focusOnLastCandidate={focusOnLastCandidate}
          userCandidateAllowance={election.userCandidateAllowance}
          isDisabled={election.creator !== user.id}
        />
        <Spacer />
        <AdvancedOptions
          userCandidateAllowance={election.userCandidateAllowance}
          onChange={handleChange}
          isDisabled={election.creator !== user.id}
          mustProvideName={get(election, 'usersMustProvideName', true)}
        />
      </Panel>
      <Panel>
        <Button
          errors={errors}
          onClick={handleStartElection}
          isDisabled={election.creator !== user.id}
        >
          {t('elections.configure.start')}
        </Button>
      </Panel>
    </>
  )
}

Configurator.propTypes = {
  election: PropTypes.shape({
    fullId: PropTypes.string.isRequired,
    userCandidateAllowance: PropTypes.number.isRequired,
    creator: PropTypes.string.isRequired,
  }).isRequired,
}

export default Configurator
