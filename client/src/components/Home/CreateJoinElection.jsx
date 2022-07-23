import { Grid, Button } from 'shared/components'
import { post, get } from 'shared/utils'

function CreateElection() {
  const handleCreateElection = () => {
    console.clear()
    console.log('CREATE ELECTION')
    get('')
      .then((res) => console.log(res))
      .catch((err) => console.log('!!!ERROR', err))

    post('elections/create', { test: 'yay' })
      .then((res) => console.log(res))
      .catch((err) => console.log('!!!ERROR', err))
  }
  return (
    <Button
      onClick={handleCreateElection}
    >
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
