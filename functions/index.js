const functions = require('firebase-functions')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const { get } = require('lodash')
const { processVotes } = require('./count_votes')
const { newElection, getElection } = require('./election')
const { newUserId, doesSecretMatch } = require('./user')
const { resSuccess, resFail } = require('./utils')

const PORT = 3001
const app = express()
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../client/build')))

const baseUrl = '/api/v1'

require('dotenv').config({ path: './.env.dev.local' })

app.get(`${baseUrl}/users/new_id`, (_req, res) => {
  newUserId()
    .then(({
      id,
      secret,
      add_candidate_id: addCandidateId,
    }) => res.json(resSuccess({
      user_id: id,
      secret,
      add_candidate_id: addCandidateId,
    })))
    .catch(() => res.json(resFail({ message: 'Could not generate user id' })))
})

app.post(`${baseUrl}/users/secret_check`, (req, res) => {
  const { body: { id, secret, add_candidate_id: addCandidateId } } = req
  doesSecretMatch(id, secret)
    .then(() => {
      if (get(addCandidateId, 'length', 0) === 32) {
        res.json(resSuccess())
      } else {
        res.json(resFail({}, 400))
      }
    })
    .catch(() => {
      res.json(resFail({}, 404))
    })
})

app.get(`${baseUrl}/elections/:electionId`, (req, res) => {
  getElection(req.params.electionId.toUpperCase())
    .then((fbId) => res.json(resSuccess({ fbId })))
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

app.get('/api', (_req, res) => {
  res.json(resSuccess({ message: 'API running', env: process.env.NODE_ENV }))
})

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on PORT ${PORT}, env: ${process.env.NODE_ENV}`)
})

exports.app = functions.https.onRequest(app)
