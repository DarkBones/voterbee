import React from 'react'
import Grid from 'shared/Grid'
import StartElection from './StartElection'
import JoinElection from './JoinElection'

const StartJoinElection = () => {
  return (
    <Grid container>
      <Grid xs={4}>
        <StartElection />
      </Grid>
      <Grid xs={4}>
        ... or ...
      </Grid>
      <Grid xs={4}>
        <JoinElection />
      </Grid>
    </Grid>
  )
}

export default StartJoinElection