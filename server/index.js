const express = require('express')
const bodyParser = require('body-parser');

const { get } = require('lodash')
const { processVotes } = require('./count_votes')
const { newElection, getElection } = require('./election')
const { newUserId, doesSecretMatch } = require('./user')
const { resSuccess, resFail } = require('./utils')

const PORT = process.env.PORT || 3001
const app = express()
app.use(bodyParser.json())

const baseUrl = '/api/v1'

app.get(baseUrl, (_req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.get(`${baseUrl}/users/new_id`, (_req, res) => {
  newUserId()
    .then(({ id, secret }) => res.json(resSuccess({ user_id: id, secret: secret })))
    .catch(() => res.json(resFail({ message: 'Could not generate user id' })))
})

app.get(`${baseUrl}/elections/:electionId`, (req, res) => {
  getElection(req.params.electionId.toUpperCase())
    .then((fbId) => res.json(resSuccess({ fbId: fbId })))
    .catch((err) => res.json(resFail({ message: err.message }, err.status)))
})

app.post(`${baseUrl}/elections/create`, (req, res) => {
  const user = get(req, 'body.user')
  if (!user) {
    res.json(resFail({ message: 'No user ID found' }, 400))
    return
  }

  newElection(user)
    .then((id) => res.json(resSuccess({ election_id: id })))
})

app.post(`${baseUrl}/elections/count_votes`, (req, res) => {
  const { body: { electionId, user: { id: userId, secret: userSecret } } } = req
  doesSecretMatch(userId, userSecret)
    .then(() => {
      processVotes(electionId, userId)
        .then(() => res.json(resSuccess()))
        .catch(({ message, status }) => {
          res.json(resFail({ message }, status))
        })
    })
    .catch(() => {
      res.json(resFail({ message: 'Unauthorized' }, 401))
    })
})

app.post(`${baseUrl}/users/secret_check`, (req, res) => {
  const { body: { id, secret } } = req
  doesSecretMatch(id, secret)
    .then(() => {
      res.json(resSuccess())
    })
    .catch(() => {
      res.json(resFail({}, 404))
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
