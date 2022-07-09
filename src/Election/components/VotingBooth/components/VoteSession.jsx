import React from 'react'
import Panel from 'shared/Panel'
import Grid from 'shared/Grid'
import { AiOutlineCheck, AiFillCrown } from 'react-icons/ai'

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

const VoteSession = ({
  candidates,
  userId,
  usersInRoom,
  creatorId,
}) => {
  return (
    <div style={{ height: '100%' }}>
      <Grid container alignItems="flex-start">
        <Grid item xs={3}>
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
        <Grid item xs={9}>
          <Panel>
            <h3>Candidates</h3>
          </Panel>
        </Grid>
      </Grid>
    </div>
  )
}

export default VoteSession