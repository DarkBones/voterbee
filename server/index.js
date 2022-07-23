require('dotenv').config()
const express = require('express')

const PORT = process.env.PORT || 3001
const app = express()
const baseUrl = '/api/v1'
const {
  initializeApp,
  applicationDefault,
} = require('firebase-admin/app')

initializeApp({
  credential: applicationDefault(),
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
})

app.get(baseUrl, (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.post(`${baseUrl}/elections/create`, (req, res) => {
  res.json({ message: 'POST SUCCESSFUL' })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
