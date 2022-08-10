import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Panel, Button } from 'shared/components'
import CandidatesList from './components/CandidatesList'

function Candidates({
  candidates,
  onChangeVote,
  vote,
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
      />
      <Button>
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
  onChangeVote: PropTypes.func.isRequired,
  vote: PropTypes.arrayOf(
    PropTypes.shape({
      isDiscarded: PropTypes.bool.isRequired,
      candidate: PropTypes.number.isRequired,
    }).isRequired,
  ),
}

Candidates.defaultProps = {
  vote: null,
}

export default Candidates
