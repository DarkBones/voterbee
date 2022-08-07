/* eslint-disable */
import { useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { UserContext } from 'contexts'
import { Panel } from 'shared/components'
import ShareLink from './components/ShareLink'

function VotingBooth({ election }) {
  const { t } = useTranslation()
  const user = useContext(UserContext)
  return (
    <Panel>
      <h2>{election.name}</h2>
      {user === election.creator && (
        <ShareLink />
      )}
    </Panel>
  )
}

VotingBooth.propTypes = {
  election: PropTypes.shape({
    name: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
  }).isRequired,
}

export default VotingBooth
