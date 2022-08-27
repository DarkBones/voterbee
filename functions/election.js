const { map } = require('lodash')
const { db } = require('./firebase')
const { generateUniqueId } = require('./utils')

const newElection = async (user) => {
  const electionIdsRef = db.ref('election_ids')
  const electionsRef = db.ref('elections')
  return electionIdsRef.get()
    .then(async (snapshot) => {
      const id = generateUniqueId(map(snapshot.val(), 'id'))
      try {
        await electionIdsRef.push({
          id,
        })
        try {
          await electionsRef.push({
            id,
            creator: user,
            created_date: Date.now(),
            isConfigured: false,
            isFinished: false,
            userCandidateAllowance: 0,
            candidateNameSimilarityAllowed: 0,
            usersMustProvideName: true,
          })
          return await Promise.resolve(id)
        } catch (err) {
          return Promise.reject(err)
        }
      } catch (err) {
        return Promise.reject(err)
      }
    })
}

const getElection = async (electionId) => {
  const electionIdsRef = db.ref('election_ids')
  const electionsRef = db.ref('elections')
  return electionIdsRef.get()
    .then(async (electionIdsSnapshot) => {
      if (!map(electionIdsSnapshot.val(), 'id').includes(electionId)) {
        return Promise.reject(new Error({
          message: 'election not found',
          status: 404,
        }))
      }

      try {
        return await electionsRef.orderByChild('id').equalTo(electionId)
          .once('value', () => Promise.resolve())
          .then(async (electionsSnapshot) => {
            let fbId
            electionsSnapshot.forEach((child) => {
              fbId = child.key
            })

            return Promise.resolve(fbId)
          })
      } catch (err) {
        return Promise.reject(err)
      }
    })
}

module.exports = { newElection, getElection }
