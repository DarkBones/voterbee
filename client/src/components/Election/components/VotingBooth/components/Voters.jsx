import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { AiOutlineCheck, AiFillCrown } from 'react-icons/ai'
import { Panel, Grid } from 'shared/components'
import style from './Voters.module.scss'

function Voter({ user, creator }) {
  return (
    <Grid container className={style.container}>
      <Grid xs={10} className={style.name}>
        {user.name}
        {user.id === creator && (
          <span className={style.crown}>
            &nbsp;
            <AiFillCrown size={15} />
          </span>
        )}
      </Grid>
      <Grid xs={2} className={style.check}>
        <AiOutlineCheck size={20} />
      </Grid>
    </Grid>
  )
}

function Voters({ users, creator }) {
  const { t } = useTranslation()
  return (
    <Panel>
      <h3>{t('elections.session.voters.title')}</h3>
      {users.map((user) => (
        <Voter
          key={user.id}
          user={user}
          creator={creator}
        />
      ))}
    </Panel>
  )
}

Voter.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    hasVoted: PropTypes.bool.isRequired,
  }).isRequired,
  creator: PropTypes.string.isRequired,
}

Voters.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      hasVoted: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  creator: PropTypes.string.isRequired,
}

export default Voters
