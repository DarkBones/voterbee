import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import {
  ref,
  query,
  onValue,
  equalTo,
  orderByChild,
} from "firebase/database"

const Election = () => {
  const { electionId } = useParams()
  const [election, setElection] = useState({})
  useEffect(() => {
    const q = query(ref(db, 'elections'), orderByChild("id"), equalTo(electionId))
    let el = {}
    onValue(q, (snapshot) => {
      snapshot.forEach((child) => {
        el = child.val()
      })
      setElection(el)
    })
  }, [electionId])

  return (
    <h2>Election {election ? election.id : 'NADA'}</h2>
  )
}

export default Election