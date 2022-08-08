/* eslint-disabledd */
import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
import {
  ref,
  query,
  onValue,
} from 'firebase/database'
import { UserContext, DbContext } from 'contexts'
import { Panel, Grid } from 'shared/components'
import ShareLink from './components/ShareLink'
import Voters from './components/Voters'
import Candidates from './components/Candidates'

function VotingBooth({ election }) {
  // const { t } = useTranslation()
  const [vote, setVote] = useState([])
  const user = useContext(UserContext)
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
      query(ref(db, `votes/${election.fullId}/${user}`)),
      (snapshot) => {
        setVote(snapshot.val())
      },
    )
  }, [db, election, user])

  return (
    <>
      <Panel>
        <h2>{election.name}</h2>
        {user === election.creator && (
          <ShareLink />
        )}
      </Panel>
      <Grid container alignItems="flex-start">
        <Grid xs={12} sm={5} md={4}>
          <Voters
            users={users}
            creator={election.creator}
            electionId={election.fullId}
          />
        </Grid>
        <Grid xs={12} sm={7} md={8}>
          <Candidates
            candidates={election.candidates}
            vote={vote}
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
}

export default VotingBooth
