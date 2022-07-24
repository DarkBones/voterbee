const { db } = require('./firebase')
const { map } = require('lodash')
const { generateUniqueId } = require('./utils')

const newUserId = async () => {
  const userRef = db.ref('user_ids')
  const snapshot = await userRef.get()
  const newId = generateUniqueId(map(snapshot.val(), 'id'), 32, false)
  try {
    await userRef.push({ id: newId })
    return await Promise.resolve(newId)
  } catch (err) {
    return Promise.reject(err)
  }
}

module.exports = { newUserId }