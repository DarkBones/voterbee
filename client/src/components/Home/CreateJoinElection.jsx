import { Grid, Button } from 'shared/components'

function CreateElection() {
  return (
    <Button>
      Create Election
    </Button>
  )
}

function CreateJoinElection() {
  return (
    <Grid container>
      <Grid xs={12} sm={4}>
        <CreateElection />
      </Grid>
      <Grid xs={12} sm={4}>
        ... or ...
      </Grid>
      <Grid xs={12} sm={4}>
        JOIN
      </Grid>
    </Grid>
  )
}

export default CreateJoinElection
