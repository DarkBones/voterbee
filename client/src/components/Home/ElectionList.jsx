import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { get, map, orderBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import { HiUsers } from 'react-icons/hi'
import { Box } from '@mui/material'
import {
  ref,
  query,
  onValue,
} from 'firebase/database'
import {
  DbContext,
  UserContext,
} from 'contexts'
import { Grid, Chip, Spinner } from 'shared/components'
import style from './ElectionList.module.scss'

function ElectionList() {
  const { t } = useTranslation()
  const user = useContext(UserContext)
  const db = useContext(DbContext)
  const [isLoading, setIsLoading] = useState(true)
  const [elections, setElections] = useState({})

  useEffect(() => {
    if (!user.id) return

    const createdElections = []
    const joinedElections = []
    const otherElections = []

    const hasCreated = (election) => election.creator === user.id
    const hasJoined = (election) => map(map(get(election, 'users')), 'id').includes(user.id)

    onValue(
      query(ref(db, 'elections/')),
      (snapshot) => {
        const allElections = snapshot.val()
        Object.keys(allElections).forEach((electionKey) => {
          const election = allElections[electionKey]
          if (hasCreated(election)) {
            createdElections.push(election)
          } else if (hasJoined(election)) {
            joinedElections.push(election)
          } else if (user.id === process.env.REACT_APP_SUPER_USER_ID) {
            otherElections.push(election)
          }
        })
        setElections({
          created: createdElections,
          joined: joinedElections,
          other: otherElections,
        })
        setIsLoading(false)
      },
    )
  }, [user, db])

  const electionStatus = (election) => {
    let label = 'in_progress'
    let color = 'warning'
    if (!election.isConfigured) {
      label = 'not_configured'
      color = 'info'
    } else if (election.isFinished) {
      label = 'completed'
      color = 'success'
    }

    return <Chip label={t(`election_list.status.${label}`)} color={color} />
  }

  const electionUserNames = (election) => map(get(election, 'users'), 'name').join(', ')

  // const handleClick = (electionId) => {
  //   console.log('!!!CLICK', electionId)
  // }

  const buildElectionLists = () => Object.keys(elections)
    .filter((key) => elections[key].length > 0).map((key) => (
      <div key={key}>
        <h3>{t(`election_list.${key}`)}</h3>
        {orderBy(elections[key], 'created_date', 'desc').map((election) => (
          <Link
            to={`/${election.id}`}
            className={style.election_link}
            key={election.id}
          >
            <div
              className={style.election_container}
            >
              <Grid container>
                <Grid width={125} className={style.election_id}>
                  {election.id}
                </Grid>
                <Grid xs className={style.election_name}>
                  {election.name}
                </Grid>
                <Grid width={125} className={style.election_status}>
                  {electionStatus(election)}
                </Grid>
                <Box width="100%" />
                <Grid xs className={style.users}>
                  <span className={style.users_icon}>
                    <HiUsers />
                  </span>
                  &nbsp;
                  <span className={style.users_list}>
                    {electionUserNames(election)}
                  </span>
                </Grid>
              </Grid>
            </div>
          </Link>
        ))}
      </div>
    ))

  let content = <Spinner />
  if (!isLoading) {
    content = map(elections, 'length').reduce((a, b) => a + b, 0) === 0
      ? (
        <>
          <h3>{t('election_list.your_elections')}</h3>
          <p>{t('election_list.none_found')}</p>
        </>
      )
      : buildElectionLists()
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default ElectionList
