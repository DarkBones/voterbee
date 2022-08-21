const {
  map, times, random, get,
} = require('lodash')
const { db } = require('./firebase')
const { generateUniqueId } = require('./utils')

const newUserId = async () => {
  const userRef = db.ref('user_ids')
  const snapshot = await userRef.get()
  const newId = generateUniqueId(map(snapshot.val(), 'id'), 32, false)
  const newSecret = times(64, () => random(35).toString(36)).join('')
  const newAddCandidateId = generateUniqueId(map(snapshot.val(), 'add_client_id'), 32, false)
  try {
    await userRef.push({ id: newId, secret: newSecret })
    return await Promise.resolve({
      id: newId,
      secret: newSecret,
      add_candidate_id: newAddCandidateId,
    })
  } catch (err) {
    return Promise.reject(err)
  }
}

const doesSecretMatch = async (id, secret) => {
  const userRef = db.ref('user_ids')
  return userRef.orderByChild('id').equalTo(id)
    .once('value', () => Promise.resolve())
    .then(async (snapshot) => {
      let isMatch = false
      snapshot.forEach((child) => {
        if (secret === get(child.val(), 'secret')) {
          isMatch = true
        }
      })
      return isMatch
        ? Promise.resolve()
        : Promise.reject()
    })
}

module.exports = { newUserId, doesSecretMatch }
