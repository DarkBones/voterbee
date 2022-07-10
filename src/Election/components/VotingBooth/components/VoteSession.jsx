import React, { useEffect, useState } from 'react'
import Panel from 'shared/Panel'
import Grid from 'shared/Grid'
import { AiOutlineCheck, AiFillCrown } from 'react-icons/ai'
import CandidatesList from './CandidatesList'

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
        <Grid item xs={2} style={{ marginTop: '-16px', textAlign: 'right', color: user.hasVotes ? 'green' : 'lightgrey' }}>
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
}) => {
  const [candidateOrder, setCandidateOrder] = useState([])
  useEffect(() => {
    setCandidateOrder(userVotes || randomArray(candidates.length))
  }, [userVotes])

  return (
    <div style={{ height: '100%' }}>
      <Grid container alignItems="flex-start">
        <Grid item xs={12} md={3}>
          <Panel>
            <h3>Voters</h3>
            <div>
              {usersInRoom.map((user) => {
                return (
                  <User user={user} creatorId={creatorId} key={user.id} />
                )
              })}
            </div>
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
          </Panel>
        </Grid>
      </Grid>
    </div>
  )
}

export default VoteSession