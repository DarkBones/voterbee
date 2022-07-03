import React from 'react'
import Button from 'shared/Button'

const StartElection = () => {
  return (
    <div>
      <Button
        onClick={() => console.log('CLICK')}
      >
        Start Election
      </Button>
    </div>
  )
}

export default StartElection