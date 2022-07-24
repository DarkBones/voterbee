const { db } = require('./firebase')
const { map } = require('lodash')
const { generateUniqueId } = require('./utils')

const newElection = async (user) => {
  const electionIdsRef = db.ref('election_ids')
  const electionsRef = db.ref('elections')
  return await electionIdsRef.get()
    .then(async (snapshot) => {
      const id = generateUniqueId(map(snapshot.val(), 'id'))
      try {
        await electionIdsRef.push({
          id
        })
        try {
          await electionsRef.push({
            id,
            creator: user,
            created_date: Date.now(),
            isConfigured: false,
            isFinished: false,
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

module.exports = { newElection }