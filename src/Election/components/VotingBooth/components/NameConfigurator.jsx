import React, { useState } from 'react'
import { db } from 'shared/utils/firebase'
import { ref, push } from 'firebase/database'
import Panel from 'shared/Panel'
import Button from 'shared/Button'
import TextField from 'shared/FormControl/TextField'
import Spacer from 'shared/Spacer'

const NameConfigurator = ({ electionId, userId }) => {
  const [name, setName] = useState('')
  const [clickedJoin, setClickedJoin] = useState(false)

  const handleJoinElection = () => {
    setClickedJoin(true)
    push(ref(db, `elections/${electionId}/userNames`), {
      name,
      hasVoted: false,
      id: userId.id
    })
  }

  return (
    <Panel>
      <h3>What's your name?</h3>
      <TextField
        label="Your name"
        value={name}
        onChange={({ target: { value } }) => setName(value)}
      />
      <Spacer />
      <Button
        disabled={name.length === 0 || clickedJoin}
        onClick={handleJoinElection}
      >
        Join Election
      </Button>
    </Panel>
  )
}

export default NameConfigurator