import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ref,
  query,
  onValue,
} from 'firebase/database'
import { DbContext, UserContext } from 'contexts'
import { get } from 'shared/utils'
import { get as _get } from 'lodash'
import ElectionLoading from './components/ElectionLoading'

function Election() {
  const db = useContext(DbContext)
  const user = useContext(UserContext)
  const { electionId } = useParams()
  const navigate = useNavigate()
  const [election, setElection] = useState({})
  useEffect(() => {
    const notFoundState = { error: 'election_not_found', id: electionId }
    get(`elections/${electionId}`)
      .then(({ status, fbId }) => {
        if (status !== 200) {
          navigate('/', { state: notFoundState })
          return
        }

        onValue(
          query(ref(db, `elections/${fbId}`)),
          (snapshot) => {
            const el = snapshot.val()
            if (
              (el.isConfigured && _get(el, 'users', []).includes(user))
              || el.creator === user
            ) {
              setElection({
                ...el,
                status: 200,
                fullId: fbId,
              })
              return
            }

            navigate('/', { state: notFoundState })
          },
        )
      })
  }, [db, electionId, navigate, user])

  let content = <ElectionLoading />
  if (election.status === 200) {
    content = (
      <div>
        ELECTION FOUND
        {' '}
        {election.fullId}
      </div>
    )
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default Election
