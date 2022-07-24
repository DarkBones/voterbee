import { useContext } from 'react'
import { UserContext } from 'contexts'
import { Panel } from 'shared/components'
import CreateJoinElection from './CreateJoinElection'

function Home() {
  const user = useContext(UserContext)
  console.log('!!!USER', user)
  return (
    <Panel>
      <CreateJoinElection />
    </Panel>
  )
}

export default Home
