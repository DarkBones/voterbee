import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Panel } from 'shared/components'
import { randomArray } from 'shared/utils'
import CandidatesList from './components/CandidatesList'

function Candidates({ candidates, vote: voteInitial }) {
  const { t } = useTranslation()
  const [vote, setVote] = useState([])
  useEffect(() => {
    if (!voteInitial) {
      const newVote = []
      randomArray(candidates.length).forEach((c) => {
        newVote.push({
          candidate: c,
          isDiscarded: false,
        })
        setVote(newVote)
      })
    }
  }, [voteInitial, candidates])
  return (
    <Panel>
      <h3>
        {t('elections.session.candidates.title')}
      </h3>
      <CandidatesList
        candidates={candidates}
        vote={vote}
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
