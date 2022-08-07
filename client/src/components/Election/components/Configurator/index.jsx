import {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react'
import PropTypes from 'prop-types'
import {
  ref,
  update,
} from 'firebase/database'
import { DbContext } from 'contexts'
import {
  debounce,
  get,
  map,
  findIndex,
} from 'lodash'
import { useTranslation } from 'react-i18next'
import { Panel, Spacer, Button } from 'shared/components'
import { TextField } from 'shared/components/forms'
import Candidates from './Candidates'

function Configurator({ election }) {
  const { t } = useTranslation()
  const db = useContext(DbContext)
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [focusOnLastCandidate, setFocusOnLastCandidate] = useState(false)
  const [config, setConfig] = useState(election)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    setSuggestionIndex(Math.floor(Math.random() * 4))
  }, [])

  const uploadConfig = useRef(
    debounce(({ name, candidates }) => {
      update(ref(db, `elections/${election.fullId}`), {
        name,
        candidates,
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
    const newErrors = []
    if (get(config, 'name', '').length === 0) {
      newErrors.push(t('elections.configure.errors.no_title'))
    }

    if (
      findIndex(
        map(
          get(config, 'candidates', []),
          'name',
        ),
        (n) => n.length === 0,
      ) >= 0
    ) {
      newErrors.push(t('elections.configure.errors.no_name'))
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
        />
        <Spacer />
        <h4>{t('elections.configure.candidate.name')}</h4>
        <Candidates
          candidates={get(config, 'candidates', [])}
          suggestionIndex={suggestionIndex}
          onChange={handleChange}
          focusOnLastCandidate={focusOnLastCandidate}
        />
      </Panel>
      <Panel>
        <Button
          errors={errors}
          onClick={handleStartElection}
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
  }).isRequired,
}

export default Configurator
