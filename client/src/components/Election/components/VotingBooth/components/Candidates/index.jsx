import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Panel, Button, Spacer } from 'shared/components'
import CandidatesList from './components/CandidatesList'

function Candidates({
  candidates,
  isCreator,
  onChangeVote,
  vote,
  onCastVote,
  hasVoted,
  onDeleteCandidate,
}) {
  const { t } = useTranslation()

  return (
    <Panel>
      <h3>
        {t('elections.session.candidates.title')}
      </h3>
      <CandidatesList
        candidates={candidates}
        vote={vote}
        onChangeVote={onChangeVote}
        isCreator={isCreator}
        onDeleteCandidate={onDeleteCandidate}
      />
      <Spacer />
      <Button
        onClick={onCastVote}
        errors={hasVoted ? [t('elections.session.candidates.already_voted')] : []}
      >
        {t('elections.session.candidates.cast_vote')}
      </Button>
    </Panel>
  )
}

Candidates.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  isCreator: PropTypes.bool.isRequired,
  onChangeVote: PropTypes.func.isRequired,
  vote: PropTypes.arrayOf(
    PropTypes.shape({
      isDiscarded: PropTypes.bool.isRequired,
      candidate: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onCastVote: PropTypes.func.isRequired,
  hasVoted: PropTypes.bool.isRequired,
  onDeleteCandidate: PropTypes.func.isRequired,
}

Candidates.defaultProps = {
  vote: null,
}

export default Candidates
