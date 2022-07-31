const express = require('express')
const bodyParser = require('body-parser');

const { get } = require('lodash')
const { newElection, getElection } = require('./election')
const { newUserId } = require('./user')
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
    .then((id) => res.json(resSuccess({ user_id: id })))
    .catch(() => res.json(resFail({ message: 'Could not generate user id' })))
})

app.get(`${baseUrl}/elections/:electionId`, (req, res) => {
  getElection(req.params.electionId.toUpperCase())
    .then((r) => res.json(resSuccess()))
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
