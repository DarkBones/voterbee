import React, { useState, useEffect } from 'react'
import { get, map } from 'lodash'
import NameConfigurator from './components/NameConfigurator'
import VoteSession from './components/VoteSession'
import { getValues } from 'shared/utils'

const VotingBooth = ({ election, userId }) => {
  const [usersInRoom, setUsersInRoom] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setUsersInRoom(getValues(get(election, 'userNames')))
    setLoading(false)
  }, [election, userId])

  const content = map(usersInRoom, 'id').includes(userId.id)
    ? <VoteSession
      candidates={election.candidates}
      userId={userId}
      usersInRoom={usersInRoom}
      creatorId={election.creator}
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