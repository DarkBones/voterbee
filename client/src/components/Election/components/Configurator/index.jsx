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
import { debounce, get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Panel, Spacer } from 'shared/components'
import { TextField } from 'shared/components/forms'
import Candidates from './Candidates'

function Configurator({ election }) {
  const { t } = useTranslation()
  const db = useContext(DbContext)
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [config, setConfig] = useState(election)

  useEffect(() => {
    setSuggestionIndex(Math.floor(Math.random() * 4))
  }, [])

  const uploadConfig = useRef(
    debounce(({ name }) => {
      update(ref(db, `elections/${election.fullId}`), {
        name,
        // candidates,
      })
    }, 300),
  ).current

  const handleChange = (key, value) => {
    const newConfig = {
      ...config,
      [key]: value,
    }

    setConfig(newConfig)
    uploadConfig(newConfig)
  }

  return (
    <Panel>
      <h3>{t('elections.configure.title')}</h3>
      <TextField
        label={t('elections.configure.name.label')}
        placeholder={t(`elections.configure.name.placeholder_${suggestionIndex}`)}
        value={get(config, 'name', '')}
        onChange={({ target: { value } }) => handleChange('name', value)}
      />
      <Spacer />
      <Candidates
        candidates={get(config, 'candidates', [])}
        suggestionIndex={suggestionIndex}
        onChange={handleChange}
      />
    </Panel>
  )
}

Configurator.propTypes = {
  election: PropTypes.shape({
    fullId: PropTypes.string.isRequired,
  }).isRequired,
}

export default Configurator
