import { useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { AiOutlineCheck, AiFillCrown } from 'react-icons/ai'
import { GiBootKick } from 'react-icons/gi'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { RiForbid2Line } from 'react-icons/ri'
import { ref, update } from 'firebase/database'
import { UserContext, DbContext } from 'contexts'
import {
  Panel,
  Grid,
  Button,
  Tooltip,
} from 'shared/components'
import style from './Voters.module.scss'

function Voter({ user, creator, electionId }) {
  const { t } = useTranslation()
  const u = useContext(UserContext)
  const db = useContext(DbContext)
  const handleKickUser = () => {
    update(
      ref(db, `elections/${electionId}/users/${user.fullId}`),
      {
        isBanned: !user.isBanned,
      },
    )
  }

  let kickText = t('elections.session.voters.kick', { name: user.name })
  let kickIcon = <GiBootKick size={20} />
  let checkIcon = <AiOutlineCheck size={20} />
  let nameStyle = style.name
  let checkStyle = style.check
  if (user.isBanned) {
    kickText = t('elections.session.voters.unkick', { name: user.name })
    kickIcon = <BsFillDoorOpenFill size={20} />
    checkIcon = <RiForbid2Line size={20} />
    nameStyle = style.name_banned
    checkStyle = style.check_banned
  } else if (user.hasVoted) {
    checkStyle = style.check_full
  }

  return (
    <Grid container className={style.container}>
      <Grid xs className={nameStyle}>
        {user.name}
        {user.id === creator && (
          <span className={style.crown}>
            &nbsp;
            <AiFillCrown size={15} />
          </span>
        )}
      </Grid>
      {u === creator && u !== user.id && (
        <Grid xs={2} className={checkStyle}>
          <Tooltip title={kickText}>
            <div>
              <Button
                variant="icon-text"
                onClick={handleKickUser}
              >
                {kickIcon}
              </Button>
            </div>
          </Tooltip>
        </Grid>
      )}
      <Grid xs={2} className={checkStyle}>
        {checkIcon}
      </Grid>
    </Grid>
  )
}

function Voters({
  users,
  creator,
  electionId,
  user,
}) {
  const { t } = useTranslation()
  return (
    <Panel>
      <h3>{t('elections.session.voters.title')}</h3>
      {users.map((u) => (
        <Voter
          key={u.id}
          user={u}
          creator={creator}
          electionId={electionId}
        />
      ))}
      {user.id === creator && (
        <Button>
          {t('elections.session.voters.count_votes')}
        </Button>
      )}
    </Panel>
  )
}

Voter.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    hasVoted: PropTypes.bool.isRequired,
    isBanned: PropTypes.bool.isRequired,
    fullId: PropTypes.string.isRequired,
  }).isRequired,
  creator: PropTypes.string.isRequired,
  electionId: PropTypes.string.isRequired,
}

Voters.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      hasVoted: PropTypes.bool.isRequired,
      isBanned: PropTypes.bool.isRequired,
      fullId: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  creator: PropTypes.string.isRequired,
  electionId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    fullId: PropTypes.string.isRequired,
    hasVoted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default Voters
