import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
import {
  ref,
  query,
  onValue,
  set,
  update,
} from 'firebase/database'
import { DbContext } from 'contexts'
import { Panel, Grid } from 'shared/components'
import { randomArray, post } from 'shared/utils'
import ShareLink from './components/ShareLink'
import Voters from './components/Voters'
import Candidates from './components/Candidates'

function VotingBooth({
  election,
  user,
}) {
  // const { t } = useTranslation()
  const [vote, setVote] = useState([])
  const db = useContext(DbContext)
  const users = []
  Object.keys(election.users).forEach((key) => {
    const u = election.users[key]
    users.push({
      ...u,
      fullId: key,
    })
  })

  useEffect(() => {
    onValue(
      query(ref(db, `votes/${election.fullId}/${user.fullId}`)),
      (snapshot) => {
        let newVote = snapshot.val()
        if (!newVote) {
          newVote = []
          randomArray(election.candidates.length).forEach((c) => {
            newVote.push({
              candidate: c,
              isDiscarded: false,
            })
          })
        }
        setVote(newVote)
        set(ref(db, `votes/${election.fullId}/${user.fullId}`), newVote)
      },
    )
  }, [db, election, user])

  const handleChangeVote = (newVote) => {
    setVote(newVote)
    set(ref(db, `votes/${election.fullId}/${user.fullId}`), newVote)
    update(ref(db, `elections/${election.fullId}/users/${user.fullId}`), {
      hasVoted: !user.hasVoted,
    })
  }

  const handleCastVote = () => {
    update(ref(db, `elections/${election.fullId}/users/${user.fullId}`), {
      hasVoted: !user.hasVoted,
    })
  }

  const handleCountVotes = () => {
    post('elections/count_votes', {
      election,
      users: users.filter((v) => !v.isBanned),
    })
  }

  return (
    <>
      <Panel>
        <h2>{election.name}</h2>
        {user.id === election.creator && (
          <ShareLink />
        )}
      </Panel>
      <Grid container alignItems="flex-start">
        <Grid xs={12} sm={5} md={4}>
          <Voters
            users={users}
            creator={election.creator}
            electionId={election.fullId}
            user={user}
            onCountVotes={handleCountVotes}
          />
        </Grid>
        <Grid xs={12} sm={7} md={8}>
          <Candidates
            candidates={election.candidates}
            onChangeVote={handleChangeVote}
            vote={vote}
            onCastVote={handleCastVote}
            hasVoted={user.hasVoted}
          />
        </Grid>
      </Grid>
    </>
  )
}

VotingBooth.propTypes = {
  election: PropTypes.shape({
    name: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    candidates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
    fullId: PropTypes.string.isRequired,
    users: PropTypes.shape({}).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    fullId: PropTypes.string.isRequired,
    hasVoted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default VotingBooth
