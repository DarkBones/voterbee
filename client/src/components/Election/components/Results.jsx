import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
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
import { map } from 'lodash'
import style from './Results.module.scss'

function Results({
  outcome,
  isCreator,
  electionId,
}) {
  const { t } = useTranslation()
  const db = useContext(DbContext)
  const [winners, setWinners] = useState([])

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
  return (
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
                xs={12}
                sm={6}
                key={winner.name.id}
              >
                <div className={style.winner}>
                  <div>
                    {winner.name.name}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {isCreator && (
        <>
          <Spacer />
          <Button
            onClick={handleReopenElection}
          >
            {t('elections.results.reopen')}
          </Button>
        </>
      )}
    </Panel>
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
}

export default Results
