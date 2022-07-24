import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from 'contexts'
import {
  Grid,
  Button,
  Snackbar,
} from 'shared/components'
import { post } from 'shared/utils'

function CreateElection() {
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const [isCreating, setIsCreating] = useState(false)
  const [isErrorOpen, setIsErrorOpen] = useState(false)

  const handleCreateElection = () => {
    setIsCreating(true)

    post('elections/create', { user })
      .then(({ election_id: id }) => navigate(`/${id}`))
      .catch(() => {
        setIsErrorOpen(true)
        setIsCreating(false)
      })
  }
  const buttonText = isCreating ? 'Creating Election...' : 'Create Election'
  return (
    <>
      <Snackbar
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        severity="error"
      >
        Something went wrong. Please try again later.
      </Snackbar>
      <Button
        onClick={handleCreateElection}
        isDisabled={isCreating}
      >
        {buttonText}
      </Button>
    </>
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
