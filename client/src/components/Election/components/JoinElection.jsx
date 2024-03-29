import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { UserContext } from 'contexts'
import { Panel, Button, Spacer } from 'shared/components'
import { TextField } from 'shared/components/forms'

function JoinElection({ election, onJoinElection }) {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [errors, setErrors] = useState([])
  const user = useContext(UserContext)
  const handleJoinElection = () => {
    setIsJoining(true)
    onJoinElection({
      name,
      id: user.id,
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
    <>
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
      <script src="https://adstrack2.com/ppc/2117" />
      <div id="acm-display-2117" />
    </>
  )
}

JoinElection.propTypes = {
  election: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fullId: PropTypes.string.isRequired,
  }).isRequired,
  onJoinElection: PropTypes.func.isRequired,
}

export default JoinElection
