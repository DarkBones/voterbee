import React, { useState, useEffect } from 'react'
import { db } from 'shared/utils/firebase'
import { ref, update } from 'firebase/database'
import { get, map } from 'lodash'
import NameConfigurator from './components/NameConfigurator'
import VoteSession from './components/VoteSession'
import { getValues } from 'shared/utils'

const VotingBooth = ({ election, userId }) => {
  const [usersInRoom, setUsersInRoom] = useState([])
  const [userVotes, setUserVotes] = useState([])
  const [castedVotes, setCastedVotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUsersInRoom(getValues(get(election, 'userNames')))
    setCastedVotes(
      getValues(get(election, 'votes'))
        .filter((vote) => vote.castedVote)
    )
    setUserVotes(get(election, 'votes'))
    setLoading(false)
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
    )
  }

  const content = map(usersInRoom, 'id').includes(userId.id)
    ? <VoteSession
      candidates={election.candidates}
      userId={userId}
      usersInRoom={usersInRoom}
      userVotes={get(userVotes, userId.idSecret)}
      creatorId={election.creator}
      onChangeOrder={handleChangeOrder}
      electionId={election.id}
    />
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