import React, { useEffect, useState } from 'react'
import { db } from 'shared/utils/firebase'
import { ref, update } from 'firebase/database'
import Panel from 'shared/Panel'
import Spacer from 'shared/Spacer'
import Grid from 'shared/Grid'
import Button from 'shared/Button'
import { map } from 'lodash'
import style from './ElectionResults.module.scss'

const ElectionResults = ({ election, userId }) => {
  const [winners, setWinners] = useState([])

  useEffect(() => {
    const { results } = election
    const latestResult = results[results.length - 1]
    const max = Math.max(...map(latestResult, 'votes'))
    const winners = latestResult.filter((candidate) => {
      return candidate.votes === max
    })
    setWinners(winners)
  }, [election])

  const handleReopenElection = () => {
    update(
      ref(
        db, `elections/${election.fullId}`
      ),
      {
        isFinished: false
      },
    )
  }

  const winText = winners.length === 1
    ? 'We have a winner!'
    : 'It\'s a tie!'

  return (
    <Panel>
      <h3>{election.name}</h3>
      <h1>{winText}</h1>
      <Spacer />
      <Grid container>
        {winners.map((winner, index) => (
          <Grid item xs key={index.toString()}>
            <div className={style.winner}>
              {winner.name}
              <span className={style.vote_count}>
                ({winner.votes} votes)
              </span>
            </div>
          </Grid>
        ))}
      </Grid>
      {userId.id === election.creator && (
        <>
          <Spacer />
          <Button
            onClick={handleReopenElection}
          >
            Reopen Election
          </Button>
        </>
      )}
    </Panel>
  )
}

export default ElectionResults