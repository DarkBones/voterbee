import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ref, push } from 'firebase/database'
import { DbContext, UserContext } from 'contexts'
import { Panel, Button, Spacer } from 'shared/components'
import { TextField } from 'shared/components/forms'

function JoinElection({ election }) {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [errors, setErrors] = useState([])
  const user = useContext(UserContext)
  const db = useContext(DbContext)
  const handleJoinElection = () => {
    setIsJoining(true)
    push(ref(db, `elections/${election.fullId}/users`), {
      name,
      hasVoted: false,
      id: user,
      isBanned: false,
    })
  }

  useEffect(() => {
    const newErrors = []
    if (name.length === 0) {
      newErrors.push(t('elections.join.errors.no_name'))
    }
    setErrors(newErrors)
  }, [name, t])

  const buttonText = isJoining
    ? t('elections.join.joining')
    : t('elections.join.join')

  return (
    <Panel>
      <h2>
        {election.name}
      </h2>
      <TextField
        value={name}
        label={t('elections.join.name.label')}
        placeholder={t('elections.join.name.placeholder')}
        onChange={({ target: { value } }) => setName(value)}
        onEnter={handleJoinElection}
      />
      <Spacer />
      <Button
        errors={errors}
        isDisabled={isJoining}
        onClick={handleJoinElection}
      >
        {buttonText}
      </Button>
    </Panel>
  )
}

JoinElection.propTypes = {
  election: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fullId: PropTypes.string.isRequired,
  }).isRequired,
}

export default JoinElection
