import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { Panel, Snackbar } from 'shared/components'
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
      <ElectionList />
    </>
  )
}

export default Home
