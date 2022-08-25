/* eslint-disable */
import { useState, useEffect, useContext } from 'react'
import { get, map } from 'lodash'
import {
  ref,
  query,
  onValue,
  set,
  update,
  orderByValue,
} from 'firebase/database'
import {
  DbContext,
  UserContext,
} from 'contexts'

function ElectionList() {
  const user = useContext(UserContext)
  const db = useContext(DbContext)
  const [elections, setElections] = useState({})

  useEffect(() => {
    const createdElections = []
    const joinedElections = []
    const otherElections = []
    onValue(
      query(ref(db, `elections/`)),
      (snapshot) => {
        const allElections = snapshot.val()
        Object.keys(allElections).forEach((electionKey) => {
          const election = allElections[electionKey]
          console.log('!!!', map(map(get(election, 'users')), 'id'))
          if (election.isConfigured) {
            if (election.creator === user.id) {
              createdElections.push(election)
            } else if (map(map(get(election, 'users')), 'id').includes(user.id)) {
              joinedElections.push(election)
            } else if (user.id === process.env.SUPER_USER_ID) {
              otherElections.push(election)
            }
          } else {
            otherElections.push(election)
          }
        })
        setElections({
          created: createdElections,
          joined: joinedElections,
          other: otherElections,
        })
        console.log({
          created: createdElections,
          joined: joinedElections,
          other: otherElections,
        })
      },
    )
    console.log(elections)
  }, [])

  return (
    <div>
      <h3>Your Elections</h3>
    </div>
  )
}

export default ElectionList
