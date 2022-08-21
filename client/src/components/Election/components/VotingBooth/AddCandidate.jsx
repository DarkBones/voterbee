import {
  useEffect,
  useState,
  useContext,
} from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FiSend } from 'react-icons/fi'
import { get } from 'lodash'
import {
  UserContext,
  UserAddCandidateContext,
} from 'contexts'
import {
  Panel,
  Grid,
  Button,
} from 'shared/components'
import { TextField } from 'shared/components/forms'

function AddCandidate({
  creator,
  electionCandidateAllowance,
  candidates,
  onAddCandidate,
}) {
  const { t } = useTranslation()
  const user = useContext(UserContext)
  const userAddCandidateId = useContext(UserAddCandidateContext)
  const [userCandidateAllowance, setUserCandidateAllowance] = useState(0)
  const [candidateName, setCandidateName] = useState('')

  useEffect(() => {
    if (user === creator) {
      setUserCandidateAllowance(-1)
    } else {
      const createdByUser = get(
        // find(candidates, (c) => c.added_by === userAddCandidateId),
        candidates.filter((c) => c.addedBy === userAddCandidateId),
        'length',
        0,
      )
      const leftAllowed = Math.max(electionCandidateAllowance - createdByUser, 0)
      setUserCandidateAllowance(leftAllowed)
    }
  }, [user, creator, candidates, electionCandidateAllowance, userAddCandidateId])

  const handleCreateCandidate = () => {
    if (candidateName.length === 0) return
    onAddCandidate(candidateName)
    setCandidateName('')
  }

  const messageText = userCandidateAllowance < 0
    ? t('elections.session.add_candidate.message_creator')
    : t('elections.session.add_candidate.message', { count: userCandidateAllowance })

  return (
    userCandidateAllowance !== 0 && (
      <Panel>
        <h4>
          {messageText}
        </h4>
        <Grid container spacing={0}>
          <Grid xs>
            <TextField
              placeholder={t('elections.session.add_candidate.placeholder')}
              className="with-button"
              value={candidateName}
              onChange={({ target: { value } }) => setCandidateName(value)}
              onEnter={handleCreateCandidate}
            />
          </Grid>
          <Grid width={70}>
            <div>
              <Button
                variant="with-input"
                onClick={handleCreateCandidate}
                isDisabled={candidateName.length === 0}
              >
                <FiSend />
              </Button>
            </div>
          </Grid>
        </Grid>
      </Panel>
    )
  )
}

AddCandidate.propTypes = {
  creator: PropTypes.string.isRequired,
  electionCandidateAllowance: PropTypes.number.isRequired,
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      addedBy: PropTypes.string.isRequired,
    }),
  ),
  onAddCandidate: PropTypes.func.isRequired,
}

AddCandidate.defaultProps = {
  candidates: [],
}

export default AddCandidate
