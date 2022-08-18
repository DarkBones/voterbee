const { pick, map, cloneDeep } = require('lodash')
const { db } = require('./firebase')

const countVotes = (candidates, votesInitial, resultsInitial = null, round = 0) => {
  let results = cloneDeep(resultsInitial)
  if (round > 1000) {
    return results
  }

  let votes = cloneDeep(votesInitial)

  if (!results) {
    votes = []
    votesInitial.forEach((vote) => {
      votes.push(
        map(vote.filter((v) => !v.isDiscarded), 'candidate'),
      )
    })

    results = {}
    results[round] = candidates.map((c, index) => ({
      index,
      name: c,
      votes: 0,
    }))
  } else {
    results[round] = cloneDeep(results[round - 1])
  }
  const majority = Math.floor(votes.length / 2) + 1
  let winners = []
  const losers = []

  // get all first choices
  votes.forEach((vote, index) => {
    if (vote.length > 0) {
      results[round][vote[0]].votes += 1
    } else {
      // if voter is out of votes, remove them
      votes.splice(index, 1)
    }
  })

  if (votes.length === 0) {
    const max = Math.max(...map(results[round], 'votes'))
    const output = {}
    let foundWinner = false
    Object.keys(results).forEach((r) => {
      if (!foundWinner) {
        output[r] = { ...results[r] }
      }

      winners = []
      results[r].forEach((v) => {
        if (v.votes === max) {
          winners.push(v)
        }
      })

      if (winners.length > 0 && !foundWinner) {
        foundWinner = true
        return output
      }

      return output
    })

    return output
  }

  const max = Math.max(...map(results[round], 'votes'))
  const min = Math.min(...map(results[round], 'votes').filter((v) => v > 0))

  results[round].forEach((result) => {
    if (result.votes === max) {
      winners.push(result)
    }
    if (result.votes <= min) {
      losers.push(result)
    }
  })

  if (max >= majority && winners.length === 1) {
    return results
  }

  votes.forEach((vote) => {
    vote.shift()
  })

  return countVotes(candidates, votes, results, round + 1)
}

const processVotes = async (electionId, userId) => {
  const electionRef = db.ref(`elections/${electionId}`)
  return electionRef.get()
    .then(async (snapshot) => {
      const election = snapshot.val()
      if (!election) {
        return Promise.reject(new Error({ message: 'Election not found', status: 404 }))
      }

      if (election.creator !== userId) {
        return Promise.reject(new Error({ message: 'Unauthorized', status: 401 }))
      }

      const userIds = []
      Object.keys(election.users).forEach((uId) => {
        const u = election.users[uId]
        if (u.hasVoted && !u.isBanned) {
          userIds.push(uId)
        }
      })

      if (userIds.length < 2) {
        return Promise.reject(new Error({ message: 'Not enough voters', status: 400 }))
      }

      const votesRef = db.ref(`votes/${electionId}`)
      return votesRef.get()
        .then(async (votesSnapshot) => {
          const votes = map(pick(votesSnapshot.val(), userIds))
          if (votes.length !== userIds.length) {
            return Promise.reject(new Error({ message: 'Something went wrong', status: 500 }))
          }

          const outcome = countVotes(election.candidates, votes)
          return electionRef.update({
            outcome,
          }).then(() => Promise.resolve())
        })
    })
}

module.exports = { processVotes }
