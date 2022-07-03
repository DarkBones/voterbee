import React, { useState } from 'react'
import Button from 'shared/Button'
// import { appRef } from '../../../firebase'
import { appRef } from '../../../firebase'

const StartElection = () => {
  const [disabled, setDisabled] = useState(false)

  const handleClick = () => {
    // setDisabled(true)
    console.log('!!!CLICK!!!')
    const election = {
      name: 'test',
    }
    appRef.push(election)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log('!!!ERROR', error)
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