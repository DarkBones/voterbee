import React, { useState, useEffect, useRef } from 'react'
import { has, debounce } from 'lodash'
import { db } from 'shared/utils/firebase'
import {
  ref,
  update,
} from 'firebase/database'
import TextField from 'shared/FormControl/TextField'
import ConfigureCandidates from './ConfigureCandidates'
import { SUGGESTIONS } from './constants'
import { validateElectionConfig } from './utils'
import Panel from 'shared/Panel'
import Button from 'shared/Button'

const Configurator = ({ election: initialElection }) => {
  const [suggestion, setSuggestion] = useState({})
  const [election, setElection] = useState({})
  const [clickedStartElection, setClickedStartElection] = useState(false)

  useEffect(() => {
    setSuggestion(SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)])
  }, [SUGGESTIONS])

  useEffect(() => {
    const candidates = has(initialElection, 'candidates')
      ? initialElection.candidates
      : ['', '', '']
    setElection({
      ...initialElection,
      candidates,
    })

  }, [suggestion, initialElection])

  const uploadConfig = useRef(
    debounce(({ fullId, name, candidates }) => {
      update(ref(db, `elections/${fullId}`), {
        name,
        candidates,
      })
    }, 300)
  ).current

  const handleChange = (key, value) => {
    if (clickedStartElection) return

    const newElection = {
      ...election,
      [key]: value,
    }
    setElection(newElection)
    uploadConfig(newElection)
  }

  const errors = validateElectionConfig(election)

  const handleStartElection = () => {
    setClickedStartElection(true)
    update(ref(db, `elections/${election.fullId}`), {
      isConfigured: true,
    })
  }

  return (
    <>
      <Panel>
        <TextField
          label="Name your election"
          onChange={({ target: { value } }) => handleChange('name', value)}
          placeholder={suggestion.name}
          value={election.name || ''}
        />
        <ConfigureCandidates
          suggestions={suggestion.candidates}
          candidates={election.candidates}
          onChange={handleChange}
        />
      </Panel>
      <Panel>
        <Button
          errors={errors}
          onClick={handleStartElection}
        >
          Start Election
        </Button>
      </Panel>
    </>
  )
}

export default Configurator