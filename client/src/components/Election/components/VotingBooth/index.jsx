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
import {
  DbContext,
  UserContext,
} from 'contexts'
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
import {
  randomArray,
  post,
  levenshteinDistance,
  generateCandidateId,
} from 'shared/utils'
import {
  find,
  get,
  cloneDeep,
  findIndex,
  map,
} from 'lodash'
import ShareLink from './components/ShareLink'
import Voters from './components/Voters'
import Candidates from './components/Candidates'
import AddCandidate from './AddCandidate'

function VotingBooth({
  election,
  user,
}) {
  const { t } = useTranslation()
  const [vote, setVote] = useState([])
  const [clickedCountVotes, setClickedCountVotes] = useState(election.isFinished)
  const [countErrorMessageOpen, setCountErrorMessageOpen] = useState(false)
  const [duplicateCandidateMessageOpen, setDuplicateCandidateMessageOpen] = useState(false)
  const [duplicateCandidateMessage, setDuplicateCandidateMessage] = useState('')
  const [candidateToBeDeleted, setCandidateToBeDeleted] = useState(null)
  const [candidateDeleteWarningModalOpen, setCandidateDeleteWarningModalOpen] = useState(false)
  const [dontAskDeletionConfirmation, setDontAskDeletionConfirmation] = useState(localStorage.getItem('dont_ask_deletion_confirmation') === 'true')
  const db = useContext(DbContext)
  const userContext = useContext(UserContext)
  const users = []
  const showVotersPanel = election.usersMustProvideName || election.creator === user.id
  Object.keys(get(election, 'users', {})).forEach((key) => {
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
          randomArray(get(election, 'candidates.length', 0)).forEach((c) => {
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

  const handleChangeVote = (newVote, updateHasVoted = true) => {
    if (!user.id && userContext.id === process.env.REACT_APP_SUPER_USER_ID) return

    setVote(newVote)
    set(ref(db, `votes/${election.fullId}/${user.fullId}`), newVote)
    if (updateHasVoted) {
      update(ref(db, `elections/${election.fullId}/users/${user.fullId}`), {
        hasVoted: false,
      })
    }
  }

  const handleCastVote = () => {
    if (!user.id && userContext.id === process.env.REACT_APP_SUPER_USER_ID) return

    update(ref(db, `elections/${election.fullId}/users/${user.fullId}`), {
      hasVoted: true,
    })
  }

  const handleCountVotes = () => {
    if (!user.id && userContext.id === process.env.REACT_APP_SUPER_USER_ID) return

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
            secret: userContext.secret,
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

  const userCanDeleteCandidate = (candidateId) => {
    if (!user.id && userContext.id === process.env.REACT_APP_SUPER_USER_ID) return false
    if (get(election, 'candidates.length', 0) <= 1) return false

    if (
      user.id === election.creator
      || userContext.addCandidateId === get(find(
        get(election, 'candidates', []),
        (c) => c.id === candidateId,
      ), 'addedBy')
    ) {
      return true
    }

    return false
  }

  const deleteCandidate = (candidateId) => {
    if (!user.id && userContext.id === process.env.REACT_APP_SUPER_USER_ID) return
    localStorage.setItem('dont_ask_deletion_confirmation', dontAskDeletionConfirmation)

    const deleteId = candidateId || candidateToBeDeleted

    if (!userCanDeleteCandidate(deleteId)) {
      return
    }

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
    if (!user.id && userContext.id === process.env.REACT_APP_SUPER_USER_ID) return
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

  const handleAddCandidate = (candidateName) => {
    if (!user.id && userContext.id === process.env.REACT_APP_SUPER_USER_ID) return
    const similarityAllowed = get(election, 'candidateNameSimilarityAllowed', 0)
    const candidateNames = map(
      get(election, 'candidates', []),
      'name',
    )

    for (let i = 0; i < candidateNames.length; i += 1) {
      const distance = levenshteinDistance(
        candidateNames[i].toLowerCase(),
        candidateName.toLowerCase(),
      )

      if (distance <= similarityAllowed) {
        let message = t(
          'elections.session.errors.duplicate_candidate',
          { name: candidateNames[i] },
        )
        if (distance > 0) {
          message = t(
            'elections.session.errors.similar_candidate',
            {
              newName: candidateName,
              name: candidateNames[i],
            },
          )
        }
        setDuplicateCandidateMessage(message)
        setDuplicateCandidateMessageOpen(true)
        return
      }
    }

    const newCandidates = cloneDeep(get(election, 'candidates', []))
    newCandidates.push({
      addedBy: userContext.addCandidateId,
      name: candidateName,
      id: generateCandidateId(election.candidates),
    })

    set(ref(db, `elections/${election.fullId}/candidates`), newCandidates)
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
        onChangeVote={handleChangeVote}
        vote={vote}
        onCastVote={handleCastVote}
        hasVoted={user.hasVoted}
        onDeleteCandidate={handleDeleteCandidate}
        userCanDeleteCandidate={userCanDeleteCandidate}
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
        isOpen={duplicateCandidateMessageOpen}
        onClose={() => {
          setDuplicateCandidateMessageOpen(false)
          setDuplicateCandidateMessage('')
        }}
      >
        {duplicateCandidateMessage}
      </Snackbar>
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
        {showVotersPanel && (
          <Grid xs={12} sm={5} md={4}>
            <Voters
              users={users}
              creator={election.creator}
              electionId={election.fullId}
              user={user}
              onCountVotes={handleCountVotes}
              hasClickedCountVotes={clickedCountVotes}
              usersMustProvideName={get(election, 'usersMustProvideName', true)}
            />
          </Grid>
        )}
        <Grid xs={12} sm={showVotersPanel ? 7 : 12} md={showVotersPanel ? 8 : 12}>
          {candidatesContent}
          <AddCandidate
            creator={election.creator}
            electionCandidateAllowance={election.userCandidateAllowance}
            candidates={election.candidates}
            onAddCandidate={handleAddCandidate}
          />
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
    ),
    fullId: PropTypes.string.isRequired,
    users: PropTypes.shape({}),
    isFinished: PropTypes.bool.isRequired,
    userCandidateAllowance: PropTypes.number.isRequired,
    usersMustProvideName: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      fullId: PropTypes.string.isRequired,
      hasVoted: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ]).isRequired,
}

export default VotingBooth
