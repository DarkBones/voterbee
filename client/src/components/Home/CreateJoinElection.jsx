import {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UserContext } from 'contexts'
import {
  Grid,
  Button,
  Snackbar,
} from 'shared/components'
import { TextField } from 'shared/components/forms'
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

function JoinElection() {
  const { t } = useTranslation()
  const buttonRef = useRef(null)
  const [buttonWidth, setButtonWidth] = useState(0)
  const [electionId, setElectionId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setButtonWidth(buttonRef.current.offsetWidth)
  }, [buttonRef])

  const handleJoinElection = () => {
    navigate(`/${electionId}`)
  }

  return (
    <Grid container spacing={0}>
      <Grid xs>
        <TextField
          placeholder={t('join_election.placeholder')}
          className="with-button"
          onEnter={handleJoinElection}
          onChange={({ target: { value } }) => setElectionId(value.toUpperCase())}
          value={electionId}
        />
      </Grid>
      <Grid width={buttonWidth}>
        <div ref={buttonRef}>
          <Button
            variant="with-input"
            onClick={handleJoinElection}
          >
            {t('create_election.join')}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

function CreateJoinElection() {
  const { t } = useTranslation()
  return (
    <Grid container>
      <Grid xs={12} sm={5} md={4}>
        <CreateElection />
      </Grid>
      <Grid xs={12} sm={2} md={4}>
        {t('create_election.or')}
      </Grid>
      <Grid xs={12} sm={5} md={4}>
        <JoinElection />
      </Grid>
    </Grid>
  )
}

export default CreateJoinElection
