require('dotenv').config()

const {
  initializeApp,
  applicationDefault,
  // eslint-disable-next-line import/no-unresolved
} = require('firebase-admin/app')
const {
  getDatabase,
  // eslint-disable-next-line import/no-unresolved
} = require('firebase-admin/database')

initializeApp({
  credential: applicationDefault(),
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
})

const db = getDatabase()

module.exports = { db }
