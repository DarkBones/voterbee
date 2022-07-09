import React, { useState, useEffect } from 'react'
import { has } from 'lodash'
import TextField from 'shared/FormControl/TextField'
import ConfigureCandidates from './ConfigureCandidates'
import { SUGGESTIONS } from './constants'

const Configurator = ({ election, onChange }) => {
  const [suggestion, setSuggestion] = useState({})

  useEffect(() => {
    setSuggestion(SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)])
  }, [])

  useEffect(() => {
    if (!has(election, 'candidates') && has(suggestion, 'options')) {
      onChange({
        ...election,
        candidates: ['', '', '']
      })
    }

  }, [suggestion, election])

  const handleChange = (key, value) => {
    onChange({
      ...election,
      [key]: value,
    })
  }

  return (
    <>
      <TextField
        label="Name your election"
        onChange={({ target: { value } }) => handleChange('name', value)}
        placeholder={suggestion.name}
        value={election.name}
      />
      <ConfigureCandidates
        suggestions={suggestion.candidates}
        candidates={election.candidates}
        onChange={handleChange}
      />
    </>
  )
}

export default Configurator