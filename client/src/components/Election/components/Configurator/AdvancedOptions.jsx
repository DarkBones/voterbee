import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Spacer, Grid } from 'shared/components'
import { Switch, TextField } from 'shared/components/forms'

function AdvancedOptions({
  onChange,
  userCandidateAllowance,
}) {
  const { t } = useTranslation()
  const [
    allowUsersToAddCandidates, setAllowUsersToAddCandidates,
  ] = useState(userCandidateAllowance > 0)
  const [candidateAmount, setCandidateAmount] = useState(Math.max(userCandidateAllowance, 1))

  const handleChangeCandidateCount = ({ target: { value } }) => {
    let newValue = parseInt(value, 10)
    if (newValue > 5) {
      newValue = 5
    } else if (newValue < 0) {
      newValue = 0
    }
    setCandidateAmount(newValue)
    onChange('userCandidateAllowance', newValue)
  }

  const handleAllowUsersToAddCandidatesChange = ({ target: { checked } }) => {
    setAllowUsersToAddCandidates(checked)
    if (checked) {
      onChange('userCandidateAllowance', candidateAmount)
    } else {
      onChange('userCandidateAllowance', 0)
    }
  }

  return (
    <>
      <h4>
        {t('elections.configure.advanced.title')}
      </h4>
      <Switch
        checked={allowUsersToAddCandidates}
        onChange={handleAllowUsersToAddCandidatesChange}
        label={t('elections.configure.advanced.allow_users_to_add_candidates')}
      />
      {allowUsersToAddCandidates && (
        <>
          <Spacer size={1} />
          <div>
            <Grid container>
              <Grid xs />
              <Grid>
                {t('elections.configure.advanced.users_can_add')}
              </Grid>
              <Grid>
                <TextField
                  size="small"
                  type="number"
                  value={candidateAmount}
                  onChange={handleChangeCandidateCount}
                />
              </Grid>
              <Grid xs />
            </Grid>
          </div>
        </>
      )}
    </>
  )
}

AdvancedOptions.propTypes = {
  onChange: PropTypes.func.isRequired,
  userCandidateAllowance: PropTypes.number.isRequired,
}

export default AdvancedOptions
