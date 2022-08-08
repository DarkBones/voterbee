/* eslint-disable */
import { useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { UserContext } from 'contexts'
import { Panel, Grid } from 'shared/components'
import ShareLink from './components/ShareLink'
import Voters from './components/Voters'
import Candidates from './components/Candidates'

function VotingBooth({ election }) {
  const { t } = useTranslation()
  const user = useContext(UserContext)
  const users = []
  Object.keys(election.users).forEach((key) => {
    const u = election.users[key]
    users.push({
      ...u,
      fullId: key,
    })
  })
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
  }).isRequired,
}

export default VotingBooth
