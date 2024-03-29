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
  update,
  push,
} from 'firebase/database'
import { DbContext, UserContext } from 'contexts'
import { get } from 'shared/utils'
import {
  get as _get,
  map,
  findIndex,
  filter,
} from 'lodash'
import ElectionLoading from './components/ElectionLoading'
import Configurator from './components/Configurator'
import JoinElection from './components/JoinElection'
import VotingBooth from './components/VotingBooth'
import Results from './components/Results'
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
  ).includes(user.id), [user])
  const handleJoinElection = useCallback(({ name, id }) => {
    push(ref(db, `elections/${election.fullId}/users`), {
      name,
      id,
      hasVoted: false,
      isBanned: false,
    })
  }, [db, election.fullId])

  useEffect(() => {
    document.title = [_get(election, 'name'), 'voterbee.io'].filter((n) => n).join(' | ')

    if (
      (!election.users && _get(election, 'usersMustProvideName', true))
      || !user
    ) return

    const userId = Object.keys(_get(election, 'users', {}))[
      findIndex(map(election.users), (u) => u.id === user.id)
    ]
    if (userId) {
      setFbUser({
        ..._get(election.users, `${userId}`),
        fullId: userId,
      })
    } else if (!_get(election, 'usersMustProvideName', true)) {
      handleJoinElection({ name: '', id: user.id })
    }
  }, [election, handleJoinElection, user])

  useEffect(() => {
    const notFoundState = { error: 'election_not_found', id: electionId }
    if (!user.id) return

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
              || el.creator === user.id
              || user.id === process.env.REACT_APP_SUPER_USER_ID
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

  const handleTieBreakerVote = (candidateId, isRandom) => {
    if (election.creator !== fbUser.id || !election.outcome) return

    update(ref(db, `elections/${election.fullId}`), {
      tiebreaker: {
        random: isRandom,
        picked: candidateId,
      },
    })
  }

  let content = <ElectionLoading />
  if (election.status === 200) {
    if (election.isConfigured) {
      if (!fbUser && election.usersMustProvideName) {
        if (user.id === process.env.REACT_APP_SUPER_USER_ID) {
          content = (
            <>
              <JoinElection election={election} onJoinElection={handleJoinElection} />
              <VotingBooth election={election} user={fbUser} />
            </>
          )
        } else {
          content = <JoinElection election={election} onJoinElection={handleJoinElection} />
        }
      } else if (fbUser.isBanned) {
        content = <Banned />
      } else if (election.isFinished && election.outcome) {
        content = (
          <Results
            outcome={election.outcome}
            creator={election.creator}
            user={fbUser}
            electionId={election.fullId}
            onTieBreakerVote={handleTieBreakerVote}
            tieBreaker={election.tiebreaker}
            voters={filter(map(election.users), (u) => u.hasVoted)}
            candidates={election.candidates}
            usersMustProvideName={_get(election, 'usersMustProvideName', true)}
          />
        )
      } else {
        content = <VotingBooth election={election} user={fbUser} />
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
