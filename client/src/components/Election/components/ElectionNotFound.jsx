import { Panel } from 'shared/components'
import { useTranslation } from 'react-i18next'
import Home from '../../Home'

function ElectionNotFound() {
  const { t } = useTranslation()

  return (
    <>
      <Panel>
        <h3>
          {t('elections.not_found')}
        </h3>
      </Panel>
      <Home />
    </>
  )
}

export default ElectionNotFound
