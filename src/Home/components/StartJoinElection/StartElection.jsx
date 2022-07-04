import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Button from 'shared/Button'
import { db } from '../../../firebase'
import { ref, push } from "firebase/database"
import { getOrSetUserId } from 'shared/utils'

const StartElection = () => {
  const [disabled, setDisabled] = useState(false)
  const history = useHistory()

  const handleClick = () => {
    setDisabled(true)

    const userId = getOrSetUserId()
    const electionId = Math.random().toString(36).substr(2, 5).toUpperCase()
    console.log('!!!', userId)

    const election = {
      id: electionId,
      creator: userId,
      createdDate: Date.now(),
      isConfigured: false,
      isFinished: false,
    }

    push(ref(db, 'elections'), election)
      .then(() => {
        history.push(`/${electionId}`)
      })
  }

  return (
    <div>
      <Button
        onClick={handleClick}
        disabled={disabled}
      >
        Start Election
      </Button>
    </div>
  )
}

export default StartElection