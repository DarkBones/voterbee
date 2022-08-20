import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  ref,
  query,
  onValue,
  set,
  update,
} from 'firebase/database'
import { DbContext, SecretContext } from 'contexts'
import {
  Panel,
  Grid,
  Snackbar,
  Spinner,
  Spacer,
  Modal,
  Button,
} from 'shared/components'
import { Switch } from 'shared/components/forms'
import { randomArray, post } from 'shared/utils'
import {
  find,
  get,
  cloneDeep,
  findIndex,
} from 'lodash'
import ShareLink from './components/ShareLink'
import Voters from './components/Voters'
import Candidates from './components/Candidates'

function VotingBooth({
  election,
  user,
}) {
  const { t } = useTranslation()
  const [vote, setVote] = useState([])
  const [clickedCountVotes, setClickedCountVotes] = useState(election.isFinished)
  const [countErrorMessageOpen, setCountErrorMessageOpen] = useState(false)
  const [candidateToBeDeleted, setCandidateToBeDeleted] = useState(null)
  const [candidateDeleteWarningModalOpen, setCandidateDeleteWarningModalOpen] = useState(false)
  const [dontAskDeletionConfirmation, setDontAskDeletionConfirmation] = useState(false)
  const db = useContext(DbContext)
  const secret = useContext(SecretContext)
  const users = []
  Object.keys(election.users).forEach((key) => {
    const u = election.users[key]
    users.push({
      ...u,
      fullId: key,
    })
  })

  useEffect(() => {
    onValue(
      query(ref(db, `votes/${election.fullId}/${user.fullId}`)),
      (snapshot) => {
        let newVote = snapshot.val()
        if (!newVote) {
          newVote = []
          randomArray(election.candidates.length).forEach((c) => {
            newVote.push({
              candidate: election.candidates[c].id,
              isDiscarded: false,
            })
          })
        }
        setVote(newVote)
        set(ref(db, `votes/${election.fullId}/${user.fullId}`), newVote)
      },
    )
  }, [db, election, user])

  const handleChangeVote = (newVote) => {
    setVote(newVote)
    set(ref(db, `votes/${election.fullId}/${user.fullId}`), newVote)
    update(ref(db, `elections/${election.fullId}/users/${user.fullId}`), {
      hasVoted: false,
    })
  }

  const handleCastVote = () => {
    update(ref(db, `elections/${election.fullId}/users/${user.fullId}`), {
      hasVoted: true,
    })
  }

  const handleCountVotes = () => {
    setClickedCountVotes(true)
    update(ref(db, `elections/${election.fullId}`), {
      isFinished: true,
      outcome: null,
    })
      .then(() => {
        post('elections/count_votes', {
          electionId: election.fullId,
          user: {
            id: user.id,
            secret,
          },
        })
          .then(({ status }) => {
            if (status !== 200) {
              setClickedCountVotes(false)
              setCountErrorMessageOpen(true)
              update(ref(db, `elections/${election.fullId}`), {
                isFinished: false,
                outcome: null,
              })
            }
          })
      })
  }

  const deleteCandidate = (candidateId) => {
    localStorage.setItem('dont_ask_deletion_confirmation', dontAskDeletionConfirmation)

    const deleteId = candidateId || candidateToBeDeleted

    const idx = findIndex(
      get(election, 'candidates', []),
      (c) => c.id === deleteId,
    )
    if (idx < 0) return

    const newCandidates = cloneDeep(election.candidates)
    newCandidates.splice(idx, 1)
    update(ref(db, `elections/${election.fullId}`), {
      candidates: newCandidates,
    })
    setCandidateDeleteWarningModalOpen(false)
    setCandidateToBeDeleted(null)
  }

  const handleDeleteCandidate = (candidateId) => {
    if (localStorage.getItem('dont_ask_deletion_confirmation') === 'true') {
      deleteCandidate(candidateId)
      return
    }
    setCandidateToBeDeleted(candidateId)
    setCandidateDeleteWarningModalOpen(true)
  }

  const handleSetDontAskDeletionConfirmation = ({ target: { checked } }) => {
    setDontAskDeletionConfirmation(checked)
  }

  const candidatesContent = election.isFinished
    ? (
      <Panel>
        <Spinner />
        <Spacer />
        {t('elections.session.counting')}
      </Panel>
    )
    : (
      <Candidates
        candidates={election.candidates}
        isCreator={election.creator === user.id}
        onChangeVote={handleChangeVote}
        vote={vote}
        onCastVote={handleCastVote}
        hasVoted={user.hasVoted}
        onDeleteCandidate={handleDeleteCandidate}
      />
    )

  return (
    <>
      <Modal
        isOpen={candidateDeleteWarningModalOpen}
        title={t('elections.session.deletemodal.title')}
        onClose={() => setCandidateDeleteWarningModalOpen(false)}
        footer={(
          <Grid container>
            <Grid xs="auto">
              <Button
                variant="secondary"
                onClick={() => {
                  setCandidateDeleteWarningModalOpen(false)
                  setCandidateToBeDeleted(null)
                }}
              >
                {t('elections.session.deletemodal.cancel')}
              </Button>
            </Grid>
            <Grid xs />
            <Grid xs="auto">
              <Button
                onClick={() => deleteCandidate()}
              >
                {t('elections.session.deletemodal.confirm')}
              </Button>
            </Grid>
          </Grid>
        )}
      >
        {t('elections.session.deletemodal.warning', {
          candidate: get(find(election.candidates, (c) => c.id === candidateToBeDeleted), 'name'),
        })}
        <Spacer />
        <div>
          <Switch
            checked={dontAskDeletionConfirmation}
            onChange={handleSetDontAskDeletionConfirmation}
            label={t('elections.session.deletemodal.dont_ask_again')}
          />
        </div>
      </Modal>
      <Snackbar
        severity="error"
        isOpen={countErrorMessageOpen}
        onClose={() => setCountErrorMessageOpen(false)}
      >
        {t('elections.session.errors.generic')}
      </Snackbar>
      <Panel>
        <h2>{election.name}</h2>
        {user.id === election.creator && (
          <ShareLink />
        )}
      </Panel>
      <Grid container alignItems="flex-start">
        <Grid xs={12} sm={5} md={4}>
          <Voters
            users={users}
            creator={election.creator}
            electionId={election.fullId}
            user={user}
            onCountVotes={handleCountVotes}
            hasClickedCountVotes={clickedCountVotes}
          />
        </Grid>
        <Grid xs={12} sm={7} md={8}>
          {candidatesContent}
        </Grid>
      </Grid>
    </>
  )
}

VotingBooth.propTypes = {
  election: PropTypes.shape({
    name: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    candidates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
    fullId: PropTypes.string.isRequired,
    users: PropTypes.shape({}).isRequired,
    isFinished: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    fullId: PropTypes.string.isRequired,
    hasVoted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default VotingBooth
