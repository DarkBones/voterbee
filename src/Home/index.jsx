import React from 'react'
import Panel from 'shared/Panel'
import StartJoinElection from './components/StartJoinElection'

const Home = () => {
  return (
    <>
      <Panel>
        <StartJoinElection />
      </Panel>
      <div className="divtest">
        test2
      </div>
    </>
  )
}

export default Home