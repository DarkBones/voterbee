import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Panel } from 'shared/components'
import CandidatesList from './components/CandidatesList'

function Candidates({ candidates }) {
  const { t } = useTranslation()
  return (
    <Panel>
      <h3>
        {t('elections.session.candidates.title')}
      </h3>
      <CandidatesList
        candidates={candidates}
      />
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
}

export default Candidates
