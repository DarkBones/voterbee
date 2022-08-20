import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FaRandom } from 'react-icons/fa'
import {
  ref,
  update,
} from 'firebase/database'
import { DbContext } from 'contexts'
import {
  Panel,
  Grid,
  Spacer,
  Button,
} from 'shared/components'
import { map, sample } from 'lodash'
import style from './Results.module.scss'

function Results({
  outcome,
  isCreator,
  electionId,
  onTieBreakerVote,
}) {
  const { t } = useTranslation()
  const db = useContext(DbContext)
  const [winners, setWinners] = useState([])
  const [hasPicked, setHasPicked] = useState(false)

  const handleReopenElection = () => {
    update(ref(db, `elections/${electionId}`), {
      isFinished: false,
      outcome: null,
    })
  }

  useEffect(() => {
    setWinners(outcome[outcome.length - 1].filter((o) => o.votes === Math.max(
      ...map(outcome[outcome.length - 1], 'votes'),
    )))
  }, [outcome])
  const winnerText = winners.length === 1
    ? t('elections.results.winner')
    : t('elections.results.tie')

  const handlePickCandidate = (candidateId) => {
    setHasPicked(false)
    onTieBreakerVote(candidateId)
  }

  const handlePickRandom = () => {
    setHasPicked(false)
    onTieBreakerVote(sample(winners).id)
  }

  return (
    <>
      <Panel>
        {winners.length > 0 && (
          <>
            <h2>{winnerText}</h2>
            <Grid
              container
              className={style.winnersContainer}
            >
              {winners.map((winner) => (
                <Grid
                  xs={12 / winners.length}
                  key={winner.id}
                >
                  <div className={style.winner}>
                    <div>
                      {winner.name}
                    </div>
                  </div>
                  {isCreator && winners.length > 1 && (
                    <>
                      <Spacer />
                      <Button
                        onClick={() => handlePickCandidate(winner.id)}
                        isDisabled={hasPicked}
                      >
                        {t('elections.results.pick', { name: winner.name })}
                      </Button>
                    </>
                  )}
                </Grid>
              ))}
            </Grid>
            {isCreator && winners.length > 1 && (
              <>
                <Spacer />
                <Button
                  onClick={handlePickRandom}
                  isDisabled={hasPicked}
                >
                  <FaRandom />
                  &nbsp;
                  {t('elections.results.pick_random')}
                </Button>
              </>
            )}
          </>
        )}
      </Panel>
      {isCreator && (
        <Panel>
          <Button
            onClick={handleReopenElection}
          >
            {t('elections.results.reopen')}
          </Button>
        </Panel>
      )}
    </>
  )
}

Results.propTypes = {
  outcome: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({}).isRequired,
    ).isRequired,
  ).isRequired,
  isCreator: PropTypes.bool.isRequired,
  electionId: PropTypes.string.isRequired,
  onTieBreakerVote: PropTypes.func.isRequired,
}

export default Results
