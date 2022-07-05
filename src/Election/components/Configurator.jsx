import React, { useState } from 'react'
import TextField from 'shared/FormControl/TextField'
import Button from 'shared/Button'

const Configurator = () => {
  const [name, setName] = useState('')
  const handleChange = ({ target: { value } }) => {
    setName(value)
  }

  const suggestions = [
    {
      name: 'Where should we eat?',
      options: [
        'Nandos',
        'The grub hut',
        'Fred\'s',
      ],
    },
    {
      name: 'What should we do?',
      options: [
        'Eat chicken wings',
        'Go to a theme park',
        'Karting',
      ],
    },
    {
      name: 'Who should organize the party?',
      options: [
        'Bryan',
        'Fred',
        'Dave',
      ],
    },
    {
      name: 'What is the best food?',
      options: [
        'Pizza',
        'Hotdog',
        'Cookies',
      ],
    },
  ]

  const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)]

  return (
    <>
      <TextField
        label="Name"
        onChange={handleChange}
        placeholder={suggestion.name}
        value={name}
      />
    </>
  )
}

export default Configurator