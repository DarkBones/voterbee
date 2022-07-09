import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from 'shared/utils/firebase'
import {
  ref,
  query,
  onValue,
  equalTo,
  orderByChild,
} from 'firebase/database'
import Panel from 'shared/Panel'
import Spinner from 'shared/Spinner'
import { getOrSetUserId } from 'shared/utils'
import Configurator from './components/Configurator'

const Election = () => {
  const { electionId } = useParams()
  const userId = getOrSetUserId()
  const [election, setElection] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onValue(
      query(ref(db, 'elections'), orderByChild('id'), equalTo(electionId)),
      (snapshot) => {
        let el = {}
        let id = ''

        snapshot.forEach((child) => {
          el = child.val()
          id = child.key
        })
        if (el.isConfigured || el.creator === userId) {
          setLoading(false)
          setElection({
            ...el,
            fullId: id,
          })
        }
      })
  }, [electionId])

  let content = <Panel><Spinner /></Panel>

  if (!loading) {
    if (!election.isConfigured) {
      content = (
        <Configurator
          election={election}
        />
      )
    } else {
      content = <h3>Election {election.id}</h3>
    }
  }

  return (
    <>
      {content}
    </>
  )
}

export default Election