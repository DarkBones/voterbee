import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Button from 'shared/Button'
import { db } from 'shared/utils/firebase'
import { ref, push } from 'firebase/database'
import { getOrSetUserId } from 'shared/utils'

const StartElection = () => {
  const [disabled, setDisabled] = useState(false)
  const history = useHistory()

  const handleClick = () => {
    setDisabled(true)

    const userId = getOrSetUserId()
    const electionId = Math.random().toString(36).substr(2, 5).toUpperCase()
    const election = {
      id: electionId,
      creator: userId.id,
      createdDate: Date.now(),
      isConfigured: false,
      isFinished: false,
    }

    push(ref(db, 'elections'), election)
      .then(() => {
        history.push(`/${electionId}`)
      })
  }

  const buttonText = disabled ? 'Creating Election...' : 'New Election'

  return (
    <div>
      <Button
        onClick={handleClick}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default StartElection