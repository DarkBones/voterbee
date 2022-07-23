require('dotenv').config()

const {
  initializeApp,
  applicationDefault,
} = require('firebase-admin/app')
const {
  getDatabase,
  ref,
  get,
} = require('firebase-admin/database')

initializeApp({
  credential: applicationDefault(),
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
})

const db = getDatabase()

module.exports = { db }