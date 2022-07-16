import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import Panel from 'shared/Panel'
import { InputAdornment, Snackbar, Alert } from '@mui/material'
import Grid from 'shared/Grid'
import Spacer from 'shared/Spacer'
import Button from 'shared/Button'
import { randomArray } from 'shared/utils'
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
            <span style={{ marginLeft: 5, color: 'green' }}>
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
  onCountVotes,
  electionName,
}) => {
  const [candidateOrder, setCandidateOrder] = useState([])
  const [copyMessageOpen, setCopyMessageOpen] = useState(false)

  useEffect(() => {
    // if (get(userVotes, 'order', []).length !== candidates.length) {
    //   setCandidateOrder(randomArray(candidates.length))
    // } else {
    //   setCandidateOrder(userVotes.order)
    // }
    const fbVotes = get(userVotes, 'order', [])
    const cs = []
    if (fbVotes.length !== candidates.length) {
      randomArray(candidates.length).forEach((i) => {
        cs.push({
          value: i,
          isDiscarded: false,
        })
      })
      setCandidateOrder(cs)
    } else {
      setCandidateOrder(userVotes.order)
    }
  }, [userVotes, candidates])

  const isCreator = userId.id === creatorId

  const handleClickedCopy = (e) => {
    e.stopPropagation()

    navigator.clipboard.writeText(window.location.href)
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

  const handleCastVote = () => {
    onCastVote(candidateOrder)
  }

  return (
    <div>
      {isCreator && (
        <Panel>
          <h3>Share this link with your friends / colleagues</h3>
          <div style={{ maxWidth: '250px', margin: '0 auto' }}>
            <TextField
              variant="filled"
              value={window.location.href}
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
                  onClick={onCountVotes}
                >
                  Count Votes
                </Button>
              </>
            )}
          </Panel>
        </Grid>
        <Grid item xs={12} md={9}>
          <Panel>
            <h3>{electionName}</h3>
            <p>
              Order from favourite to least favourite, and discard any candidates you don't have an opinion on.
            </p>
            <Spacer />
            <CandidatesList
              candidates={candidates}
              order={candidateOrder}
              onChangeOrder={onChangeOrder}
            />
            <Button
              onClick={handleCastVote}
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