const express = require('express')

const PORT = process.env.PORT || 3001

const app = express()

const baseUrl = '/api/v1'

app.get(baseUrl, (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.post(`${baseUrl}/elections/create`, (req, res) => {
  res.json({ message: 'POST SUCCESSFUL' })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
