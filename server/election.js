const { db } = require('./firebase')
const { map } = require('lodash')
const { generateUniqueId } = require('./utils')

const newElection = () => {
  const electionRef = db.ref('election_ids')
  electionRef.get()
    .then((snapshot) => {
      const id = generateUniqueId(map(snapshot.val(), 'id'))
      console.log(id)
    })
}

module.exports = { newElection }