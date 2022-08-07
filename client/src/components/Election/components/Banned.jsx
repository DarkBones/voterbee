import { useTranslation } from 'react-i18next'
import { Panel } from 'shared/components'

function Banned() {
  const { t } = useTranslation()
  return (
    <Panel>
      <h2>
        {t('elections.banned.message')}
      </h2>
    </Panel>
  )
}

export default Banned
