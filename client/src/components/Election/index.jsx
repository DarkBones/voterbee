import {
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ref,
  query,
  onValue,
} from 'firebase/database'
import { DbContext, UserContext } from 'contexts'
import { get } from 'shared/utils'
import { get as _get, map, find } from 'lodash'
import ElectionLoading from './components/ElectionLoading'
import Configurator from './components/Configurator'
import JoinElection from './components/JoinElection'
import VotingBooth from './components/VotingBooth'
import Banned from './components/Banned'

function Election() {
  const db = useContext(DbContext)
  const user = useContext(UserContext)
  const { electionId } = useParams()
  const navigate = useNavigate()
  const [election, setElection] = useState({})
  const [fbUser, setFbUser] = useState(false)
  const userIsInElection = useCallback((el) => map(
    _get(el, 'users', []),
    'id',
  ).includes(user), [user])
  useEffect(() => {
    setFbUser(find(map(election.users), (u) => u.id === user))
  }, [election, user])

  useEffect(() => {
    const notFoundState = { error: 'election_not_found', id: electionId }
    if (!user) return

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
              (el.isConfigured && !el.isFinished)
              || (el.isConfigured && userIsInElection(el))
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
  }, [db, electionId, navigate, user, userIsInElection])

  let content = <ElectionLoading />
  if (election.status === 200) {
    if (election.isConfigured) {
      if (!fbUser) {
        content = <JoinElection election={election} />
      } else if (fbUser.isBanned) {
        content = <Banned />
      } else {
        content = <VotingBooth election={election} />
      }
    } else {
      content = <Configurator election={election} />
    }
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default Election