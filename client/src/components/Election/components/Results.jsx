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
import { map, sample, find } from 'lodash'
import style from './Results.module.scss'

function Results({
  outcome,
  tieBreaker,
  isCreator,
  electionId,
  onTieBreakerVote,
}) {
  const { t } = useTranslation()
  const db = useContext(DbContext)
  const [winners, setWinners] = useState([])
  const [finalWinners, setFinalWinners] = useState([])

  const handleReopenElection = () => {
    update(ref(db, `elections/${electionId}`), {
      isFinished: false,
      outcome: null,
      tiebreaker: null,
    })
  }

  useEffect(() => {
    const ws = outcome[outcome.length - 1].filter((o) => o.votes === Math.max(
      ...map(outcome[outcome.length - 1], 'votes'),
    ))
    setWinners(ws)

    if (!tieBreaker) {
      setFinalWinners(ws)
    } else {
      console.log(find(outcome[outcome.length - 1], (o) => o.id === tieBreaker.picked))
      setFinalWinners([find(outcome[outcome.length - 1], (o) => o.id === tieBreaker.picked)])
    }
  }, [outcome, tieBreaker])
  const winnerText = finalWinners.length === 1
    ? t('elections.results.winner')
    : t('elections.results.tie')

  const handlePickCandidate = (candidateId) => {
    onTieBreakerVote(candidateId, false)
  }

  const handlePickRandom = () => {
    onTieBreakerVote(sample(winners).id, true)
  }

  return (
    <>
      <Panel>
        {finalWinners.length > 0 && (
          <>
            <h2>{winnerText}</h2>
            <Grid
              container
              className={style.winnersContainer}
            >
              {finalWinners.map((winner) => (
                <Grid
                  xs={12 / finalWinners.length}
                  key={winner.id}
                >
                  <div className={style.winner}>
                    <div>
                      {winner.name}
                    </div>
                  </div>
                  {isCreator && finalWinners.length > 1 && (
                    <>
                      <Spacer />
                      <Button
                        onClick={() => handlePickCandidate(winner.id)}
                      >
                        {t('elections.results.pick', { name: winner.name })}
                      </Button>
                    </>
                  )}
                </Grid>
              ))}
            </Grid>
            {isCreator && finalWinners.length > 1 && (
              <>
                <Spacer />
                <Button
                  onClick={handlePickRandom}
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
  tieBreaker: PropTypes.shape({
    random: PropTypes.bool.isRequired,
    picked: PropTypes.string.isRequired,
  }),
}

Results.defaultProps = {
  tieBreaker: null,
}

export default Results
