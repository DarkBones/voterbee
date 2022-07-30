import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UserContext } from 'contexts'
import {
  Grid,
  Button,
  Snackbar,
} from 'shared/components'
import { post } from 'shared/utils'

function CreateElection() {
  const { t } = useTranslation()
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
  // const buttonText = isCreating ? 'Creating Election...' : 'Create Election'
  const buttonText = isCreating
    ? t('create_election.creating')
    : t('create_election.create')
  return (
    <>
      <Snackbar
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        severity="error"
      >
        {t('errors.generic')}
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
  const { t } = useTranslation()
  return (
    <Grid container>
      <Grid xs={12} sm={4}>
        <CreateElection />
      </Grid>
      <Grid xs={12} sm={4}>
        {t('create_election.or')}
      </Grid>
      <Grid xs={12} sm={4}>
        {t('create_election.join')}
      </Grid>
    </Grid>
  )
}

export default CreateJoinElection
