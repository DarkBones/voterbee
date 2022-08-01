import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Panel } from 'shared/components'
import { TextField } from 'shared/components/forms'

function Configurator({ election }) {
  const { t } = useTranslation()
  console.log(election)
  return (
    <Panel>
      <h3>{t('elections.configure.title')}</h3>
      <TextField
        label={t('elections.configure.name.label')}
        placeholder={t('elections.configure.name.placeholder')}
        value=""
      />
    </Panel>
  )
}

Configurator.propTypes = {
  election: PropTypes.shape({}).isRequired,
}

export default Configurator
