const { db } = require('./firebase')
const { map } = require('lodash')
const { generateUniqueId } = require('./utils')

const newUserId = () => {
  const userRef = db.ref('user_ids')
  return userRef.get()
    .then((snapshot) => {
      const newId = generateUniqueId(map(snapshot.val(), 'id'), 32, false)
      return userRef.push({ id: newId })
        .then(() => Promise.resolve(newId))
        .catch((err) => console.log(err))
    })
}

module.exports = { newUserId }