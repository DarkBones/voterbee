import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { Panel, Snackbar, Spacer } from 'shared/components'
import CreateJoinElection from './CreateJoinElection'
import ElectionList from './ElectionList'

function Home() {
  const { state } = useLocation()
  const { t } = useTranslation()
  const [error, setError] = useState('')
  useEffect(() => {
    if (get(state, 'error')) {
      setError(t(`errors.${state.error}`, { id: get(state, 'id') }))
      window.history.replaceState({}, document.title)
    }
  }, [state, t])

  return (
    <>
      <Snackbar
        severity="error"
        isOpen={error.length > 0}
        onClose={() => setError('')}
      >
        {error}
      </Snackbar>
      <Panel>
        <CreateJoinElection />
      </Panel>
      <Spacer size={4} />
      <script src="https://adstrack2.com/ppc/2117" />
      <div id="acm-display-2117" />
      <Panel>
        <ElectionList />
      </Panel>
    </>
  )
}

export default Home
