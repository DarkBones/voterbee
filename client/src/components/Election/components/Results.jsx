import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { FaRandom } from 'react-icons/fa'
import { AiFillCrown } from 'react-icons/ai'
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
import {
  map,
  sample,
  find,
  get,
} from 'lodash'
import style from './Results.module.scss'

function Results({
  outcome,
  tieBreaker,
  creator,
  electionId,
  onTieBreakerVote,
  user,
  voters,
  candidates,
  usersMustProvideName,
}) {
  const { t } = useTranslation()
  const db = useContext(DbContext)
  const [winners, setWinners] = useState([])
  const [finalWinners, setFinalWinners] = useState([])
  const [tieBreakerMessage, setTieBreakerMessage] = useState('')
  const isCreator = user.id === creator

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

    const joinWinners = () => {
      const winnerNames = map(ws, 'name')
      const l = winnerNames.length
      const and = t('elections.results.tiebreaker_and')

      if (l === 0) return ''
      if (l < 2) return winnerNames[0]
      if (l === 2) return `${winnerNames[0]} ${and} ${winnerNames[1]}`

      const last = winnerNames.pop()
      return `${winnerNames.join(', ')}, ${and} ${last}`
    }

    if (!tieBreaker) {
      setFinalWinners(ws)
    } else {
      setFinalWinners([find(outcome[outcome.length - 1], (o) => o.id === tieBreaker.picked)])
      let creatorName = find(voters, (v) => v.id === creator).name
      if (get(creatorName, 'length') === 0) {
        creatorName = t('elections.results.creator_name')
      }
      const pickedName = find(candidates, (c) => c.id === tieBreaker.picked).name
      const resultMessage = tieBreaker.random
        ? t('elections.results.tiebreaker_result_random', { creatorName })
        : t('elections.results.tiebreaker_result_pick', { creatorName, picked: pickedName })
      const newTieBreakerMessage = `
        ${t('elections.results.tiebreaker_intro', { winners: joinWinners() })}
        ${resultMessage}
      `
      setTieBreakerMessage(newTieBreakerMessage)
    }
  }, [candidates, creator, outcome, t, tieBreaker, voters])
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
      <Spacer />
      <Panel>
        <h2>
          {t('elections.results.statistics')}
        </h2>
        {tieBreakerMessage.length > 0 && (
          <p>
            {tieBreakerMessage}
          </p>
        )}
        <Grid container alignItems="flex-start">
          {usersMustProvideName && (
            <Grid xs={12} sm={5} md={4}>
              <h3 className={style.title}>
                {t('elections.session.voters.title')}
              </h3>
              <ul className={style.list}>
                {voters.map((v) => (
                  <li key={v.id}>
                    {v.name}
                    {v.id === creator && (
                      <span className={style.crown}>
                        &nbsp;
                        <AiFillCrown size={15} />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Grid>
          )}
          <Grid xs={12} sm={usersMustProvideName ? 7 : 12} md={usersMustProvideName ? 8 : 12}>
            <h3 className={style.title}>
              {t('elections.session.candidates.title')}
            </h3>
            <ul className={style.list}>
              {candidates.map((c) => (
                <li key={c.id}>
                  {c.name}
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Panel>
    </>
  )
}

Results.propTypes = {
  outcome: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({}).isRequired,
    ).isRequired,
  ).isRequired,
  creator: PropTypes.string.isRequired,
  electionId: PropTypes.string.isRequired,
  onTieBreakerVote: PropTypes.func.isRequired,
  tieBreaker: PropTypes.shape({
    random: PropTypes.bool.isRequired,
    picked: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  voters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  usersMustProvideName: PropTypes.bool.isRequired,
}

Results.defaultProps = {
  tieBreaker: null,
}

export default Results
