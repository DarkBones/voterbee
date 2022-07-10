import React from 'react'
import { get } from 'lodash'
import Grid from 'shared/Grid'
import TextField from 'shared/FormControl/TextField'
import Button from 'shared/Button'
import { BiTrash } from 'react-icons/bi'
import { GoDiffAdded } from 'react-icons/go'
import { InputAdornment } from '@mui/material'
import { MIN_CANDIDATES, MAX_CANDIDATES } from './constants'

const ConfigureCandidate = ({
  candidate,
  index,
  onChange,
  onDelete,
  candidateCount,
  placeholder,
}) => {
  const handleChange = ({ target: { value } }) => {
    onChange(index, value)
  }

  const handleDelete = () => {
    if (candidateCount <= MIN_CANDIDATES) return
    onDelete(index)
  }

  const deleteButton = (
    <InputAdornment position="end" style={{
      marginRight: '-10px',
      marginTop: '-20px',
    }}>
      <div className={candidateCount > MIN_CANDIDATES ? "clickable" : "not_clickable"}
        onClick={handleDelete}
      >
        <BiTrash size={20} />
      </div>
    </InputAdornment>
  )

  return (
    <div style={{ marginBottom: '30px' }}>
      <Grid container>
        <Grid item xs={2}>
          {`Candidate ${index + 1}`}
        </Grid>
        <Grid item xs={10}>
          <TextField
            placeholder={placeholder || `Candidate ${index + 1}`}
            onChange={handleChange}
            value={candidate}
            label={`Candidate ${index + 1}`}
            InputProps={{ endAdornment: deleteButton }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

const ConfigureCandidates = ({ candidates, onChange, suggestions }) => {
  const handleChange = (index, value) => {
    const newCandidates = [...candidates]
    newCandidates[index] = value
    onChange('candidates', newCandidates)
    return
  }

  const handleAddCandidate = () => {
    const newCandidates = [...candidates, '']
    onChange('candidates', newCandidates)
  }

  const handleDeleteCandidate = (index) => {
    const newCandidates = [...candidates]
    newCandidates.splice(index, 1)
    onChange('candidates', newCandidates)
  }

  return (
    <>
      <h4>Candidates</h4>
      {candidates && candidates.map((candidate, index) => {
        return (
          <ConfigureCandidate
            key={`c${index + 1}`}
            index={index}
            candidateCount={candidates.length}
            candidate={candidate}
            onChange={handleChange}
            onDelete={handleDeleteCandidate}
            placeholder={get(suggestions, `[${index}]`)}
          />
        )
      })}
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={10}>
          <Button
            style={{ width: '100%' }}
            onClick={handleAddCandidate}
            errors={
              candidates.length >= MAX_CANDIDATES
                ? [`Can't have more than ${MAX_CANDIDATES} candidates`]
                : []
            }
            secondary
          >
            <GoDiffAdded size={23} />
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ConfigureCandidates