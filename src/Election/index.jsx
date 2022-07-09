import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { debounce } from 'lodash'
import { db } from 'shared/utils/firebase'
import {
  ref,
  query,
  onValue,
  equalTo,
  orderByChild,
  update,
} from 'firebase/database'
import Panel from 'shared/Panel'
import Spinner from 'shared/Spinner'
import { getOrSetUserId } from 'shared/utils'
import Configurator from './components/Configurator'
import Button from 'shared/Button'
import { validateElectionConfig } from './utils'

const Election = () => {
  const { electionId } = useParams()
  const userId = getOrSetUserId()
  const [election, setElection] = useState({})
  const [loading, setLoading] = useState(true)
  const [clickedStartElection, setClickedStartElection] = useState(false)

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

  const uploadConfig = useRef(
    debounce((id, name, candidates) => {
      update(ref(db, `elections/${id}`), {
        name,
        candidates,
      })
    }, 300)
  ).current

  const handleConfigChange = (newElection) => {
    if (clickedStartElection) return

    setElection(newElection)
    uploadConfig(newElection.fullId, newElection.name, newElection.candidates)
  }

  const handleStartElection = () => {
    console.log('START ELECTION')
    setClickedStartElection(true)
  }

  let content = <Spinner />
  let footer
  const errors = validateElectionConfig(election)
  if (!loading) {
    if (!election.isConfigured) {
      content = (
        <Configurator
          election={election}
          onChange={handleConfigChange}
        />
      )
      footer = (
        <Panel>
          <Button
            errors={errors}
            onClick={handleStartElection}
          >
            Start Election
          </Button>
        </Panel>
      )
    } else {
      content = <h3>Election {election.id}</h3>
    }
  }

  return (
    <>
      <Panel>
        {content}
      </Panel>
      {footer}
    </>
  )
}

export default Election