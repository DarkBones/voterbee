import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import TextField from 'shared/FormControl/TextField'
import Button from 'shared/Button'
import { InputAdornment } from '@mui/material'

const JoinElection = () => {
  const [electionId, setElectionId] = useState('')
  const history = useHistory()
  const handleChange = ({ target: { value } }) => {
    setElectionId(value.toUpperCase())
  }

  const handleClick = () => {
    history.push(`/${electionId}`)
  }

  const joinButton = (
    <InputAdornment position="end" style={{
      marginRight: '-10px',
      marginTop: '-2px',
    }}>
      <Button
        onClick={handleClick}
        edge="end"
      >
        Join
      </Button>
    </InputAdornment>
  )

  return (
    <TextField
      onChange={handleChange}
      InputProps={{ endAdornment: joinButton }}
      value={electionId}
      size="small"
      placeholder="Enter Election ID"
    />
  )
}

export default JoinElection