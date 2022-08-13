const { db } = require('./firebase')
const { map, times, random, get } = require('lodash')
const { generateUniqueId } = require('./utils')

const newUserId = async () => {
  const userRef = db.ref('user_ids')
  const snapshot = await userRef.get()
  const newId = generateUniqueId(map(snapshot.val(), 'id'), 32, false)
  const newSecret = times(64, () => random(35).toString(36)).join('')
  try {
    await userRef.push({ id: newId, secret: newSecret })
    return await Promise.resolve({ id: newId, secret: newSecret })
  } catch (err) {
    return Promise.reject(err)
  }
}

const doesSecretMatch = async (id, secret) => {
  const userRef = db.ref('user_ids')
  return await userRef.orderByChild('id').equalTo(id)
    .once('value', () => Promise.resolve())
    .then(async (snapshot) => {
      let isMatch = false
      snapshot.forEach((child) => {
        if (secret === get(child.val(), 'secret')) {
          isMatch = true
        }
      })
      return isMatch
        ? await Promise.resolve()
        : await Promise.reject()
    })
}

module.exports = { newUserId, doesSecretMatch }