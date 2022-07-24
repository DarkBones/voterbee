const express = require('express')

const { newElection } = require('./election')
const { newUserId } = require('./user')
const { resSuccess, resFail, res_success } = require('./utils')

const PORT = process.env.PORT || 3001
const app = express()
const baseUrl = '/api/v1'

app.get(baseUrl, (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.get(`${baseUrl}/users/new_id`, (req, res) => {
  newUserId()
    .then((id) => res.json(resSuccess({ user_id: id })))
    .catch(() => res.json(resFail({ message: 'Could not generate user id' })))
})

app.post(`${baseUrl}/elections/create`, (req, res) => {
  newElection()
  res.json({ message: 'POST SUCCESSFUL' })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
