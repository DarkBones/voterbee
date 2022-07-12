import React from 'react'
import Panel from 'shared/Panel'

const ElectionResults = ({ election, userId }) => {
  return (
    <Panel>
      <h2>Election Results</h2>
      <h3>{election.name}</h3>
    </Panel>
  )
}

export default ElectionResults