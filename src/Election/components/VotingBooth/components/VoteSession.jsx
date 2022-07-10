import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import Panel from 'shared/Panel'
import { InputAdornment, Snackbar, Alert } from '@mui/material'
import Grid from 'shared/Grid'
import Spacer from 'shared/Spacer'
import Button from 'shared/Button'
import TextField from 'shared/FormControl/TextField'
import { AiOutlineCheck, AiFillCrown } from 'react-icons/ai'
import CandidatesList from './CandidatesList'
import { MdContentCopy } from 'react-icons/md'

const User = ({ user, creatorId }) => {
  return (
    <div className="hoverable" style={{ padding: '10px' }}>
      <Grid container style={{ marginTop: 0 }}>
        <Grid item xs={10} style={{ marginTop: '-16px', textAlign: 'left', wordWrap: 'break-word' }}>
          {user.name}
          {user.id === creatorId && (
            <span style={{ marginLeft: 5 }}>
              <AiFillCrown size={15} />
            </span>
          )}
        </Grid>
        <Grid item xs={2} style={
          {
            marginTop: '-16px',
            textAlign: 'right',
            color: user.hasVoted ? 'green' : 'cyan'
          }
        }>
          <AiOutlineCheck size={20} />
        </Grid>
      </Grid>
    </div>
  )
}

const randomArray = (length) => {
  let array = []
  for (let i = 0; i < length; i++) {
    array.push(i)
  }

  let currentIndex = array.length, randomIndex
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}

const VoteSession = ({
  candidates,
  userId,
  usersInRoom,
  userVotes,
  creatorId,
  onChangeOrder,
  electionId,
  onCastVote,
  errors,
  castedVotes,
  user,
}) => {
  const [candidateOrder, setCandidateOrder] = useState([])
  const [copyMessageOpen, setCopyMessageOpen] = useState(false)
  useEffect(() => {
    setCandidateOrder(get(userVotes, 'order') || randomArray(candidates.length))
  }, [userVotes])

  const isCreator = userId.id === creatorId

  const handleClickedCopy = (e) => {
    e.stopPropagation()

    navigator.clipboard.writeText(`https://voterbee.io/${electionId}`)
      .then(() => setCopyMessageOpen(true))
  }

  const copyLinkButton = (
    <InputAdornment position="end" style={{
      marginRight: '-10px',
      marginTop: '20px',
    }}>
      <div
        className="clickable"
        onClick={handleClickedCopy}
      >
        <MdContentCopy size={20} />
      </div>
    </InputAdornment >
  )

  return (
    <div>
      {isCreator && (
        <Panel>
          <h3>Share this link with your friends / colleagues</h3>
          <div style={{ maxWidth: '250px', margin: '0 auto' }}>
            <TextField
              variant="filled"
              value={`https://voterbee.io/${electionId}`}
              onClick={handleClickedCopy}
              size="small"
              InputProps={{ endAdornment: copyLinkButton }}
            />
            <Snackbar
              open={copyMessageOpen}
              autoHideDuration={4000}
              onClose={() => setCopyMessageOpen(false)}
            >
              <Alert
                severity="success"
              >
                Copied to clipboard
              </Alert>
            </Snackbar>
          </div>
        </Panel>
      )}
      <Grid container alignItems="flex-start">
        <Grid item xs={12} md={3}>
          <Panel>
            <h3>Voters</h3>
            <p>Votes cast: {castedVotes} / {usersInRoom.length}</p>
            <div>
              {usersInRoom.map((user) => {
                return (
                  <User user={user} creatorId={creatorId} key={user.id} />
                )
              })}
            </div>
            {isCreator && (
              <>
                <Spacer />
                <Button
                  errors={errors}
                >
                  Count Votes
                </Button>
              </>
            )}
          </Panel>
        </Grid>
        <Grid item xs={12} md={9}>
          <Panel>
            <h3>Candidates</h3>
            <CandidatesList
              candidates={candidates}
              order={candidateOrder}
              onChangeOrder={onChangeOrder}
            />
            <Button
              onClick={onCastVote}
              errors={
                user.hasVoted
                  ? ['Already voted. Reorder your preferences to ammend your vote']
                  : []
              }
            >
              Cast Vote
            </Button>
          </Panel>
        </Grid>
      </Grid>
    </div>
  )
}

export default VoteSession