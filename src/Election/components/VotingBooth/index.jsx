import React, { useState, useEffect } from 'react'
import { db } from 'shared/utils/firebase'
import { ref, update } from 'firebase/database'
import { Snackbar, Alert } from '@mui/material'
import { get, map, find } from 'lodash'
import NameConfigurator from './components/NameConfigurator'
import VoteSession from './components/VoteSession'
import { getValues } from 'shared/utils'

const VotingBooth = ({ election, userId }) => {
  const [usersInRoom, setUsersInRoom] = useState([])
  const [userVotes, setUserVotes] = useState([])
  const [castedVotes, setCastedVotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [voteMessageOpen, setVoteMessageOpen] = useState(false)
  const [undoVoteMessageOpen, setUndoVoteMessageOpen] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const users = getValues(get(election, 'userNames'))
    setUsersInRoom(users)
    setCastedVotes(
      getValues(get(election, 'votes'))
        .filter((vote) => vote.castedVote)
    )
    setUserVotes(get(election, 'votes'))
    setLoading(false)
    setUser(find(users, (u) => u.id === userId.id))
  }, [election, userId])

  const handleChangeOrder = (newOrder) => {
    update(
      ref(
        db, `elections/${election.fullId}/votes/${userId.idSecret}`
      ),
      {
        order: newOrder,
        castedVote: false,
      },
    ).then(() => {
      if (user.hasVoted) {
        update(
          ref(
            db, `elections/${election.fullId}/userNames/${user.fb_key}`
          ),
          {
            hasVoted: false,
          },
        ).then(() => {
          setUndoVoteMessageOpen(true)
        })
      }
    })
  }

  const handleCastVote = () => {
    update(
      ref(
        db, `elections/${election.fullId}/votes/${userId.idSecret}`
      ),
      {
        castedVote: true,
      },
    ).then(() => {
      update(
        ref(
          db, `elections/${election.fullId}/userNames/${user.fb_key}`
        ),
        {
          hasVoted: true,
        },
      )
    }).then(() => {
      setVoteMessageOpen(true)
    })
  }

  const content = map(usersInRoom, 'id').includes(userId.id)
    ? <>
      <VoteSession
        candidates={election.candidates}
        userId={userId}
        usersInRoom={usersInRoom}
        userVotes={get(userVotes, userId.idSecret)}
        creatorId={election.creator}
        onChangeOrder={handleChangeOrder}
        electionId={election.id}
        onCastVote={handleCastVote}
        errors={
          castedVotes.length < 2
            ? ['At least 2 users must cast their vote']
            : []
        }
        castedVotes={castedVotes.length}
        user={user}
      />
      <Snackbar
        open={voteMessageOpen}
        autoHideDuration={4000}
        onClose={() => setVoteMessageOpen(false)}
      >
        <Alert
          severity="success"
        >
          Voted successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={undoVoteMessageOpen}
        autoHideDuration={4000}
        onClose={() => setUndoVoteMessageOpen(false)}
      >
        <Alert
          severity="warning"
        >
          Your vote is no longer casted
        </Alert>
      </Snackbar>
    </>
    : <NameConfigurator electionId={election.fullId} userId={userId} />

  return (
    <>
      {!loading && (
        content
      )}
    </>
  )
}

export default VotingBooth