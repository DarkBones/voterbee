import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { get } from 'shared/utils'
import ElectionNotFound from './components/ElectionNotFound'
import ElectionLoading from './components/ElectionLoading'

function Election() {
  const { electionId } = useParams()
  const [electionStatus, setElectionStatus] = useState(0)
  // const [election, setElection] = useState({})
  useEffect(() => {
    get(`elections/${electionId}`)
      .then(({ status }) => {
        if (status !== 200) {
          setElectionStatus(status)
          return
        }
        console.log('ELECTION FOUND')
      })
  }, [electionId])

  let content = <ElectionLoading />
  if (electionStatus === 200) {
    content = (
      <div>
        ELECTION FOUND
      </div>
    )
  } else if (electionStatus === 404) {
    content = <ElectionNotFound />
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default Election
