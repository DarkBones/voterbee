import { randomArray } from 'shared/utils'
import { map } from 'lodash'

const spoofVotes = (candidates, n) => {
  const voters = []
  for (let i = 0; i < n; i++) {
    voters.push(randomArray(candidates.length))
  }

  return voters
}

export const countVotes = (candidates, votes, debug = false, rounds = 0) => {
  // let votes = _votes
  if (debug) {
    console.clear()
    console.error('START')
    votes = spoofVotes(candidates, 2)
  }

  if (rounds > 10) {
    console.error('MAXROUNDS')
    return
  }

  const results = candidates.map((c, index) => {
    return {
      index: index,
      name: c,
      votes: 0,
      eliminated: false,
    }
  })
  const majority = Math.floor(votes.length / 2) + 1
  const winners = []
  const losers = []

  // get all first choices
  votes.forEach((vote, index) => {
    if (vote.length > 0) {
      results[vote[0]].votes += 1
    } else {
      // if voter is out of votes, remove them
      votes.splice(index, 1)
      if (votes.length === 0) {
        console.error('NO VOTES', results)
        return
      }
    }
  })

  const max = Math.max(...map(results, 'votes'))
  const min = Math.min(...map(results, 'votes').filter((v) => v > 0))

  results.forEach((result) => {
    if (result.votes === max) {
      winners.push(result)
    }
    if (result.votes <= min) {
      losers.push(result)
    }
  })

  console.log('RESULTS', results)
  console.log('MIN_MAX', min, max)
  console.log('WINNERS', winners)
  console.log('LOSERS', losers)

  // if (max === min) {
  //   console.error('TIE', results)
  //   return results
  // }

  if (max >= majority && winners.length === 1) {
    console.error('WINNER', rounds)
    return results
  }

  console.log('!!!NO WINNER')

  results.forEach((result) => {
    if (result.votes <= min) {
      result.eliminated = true
    }
  })

  votes.forEach((vote) => {
    if (vote.length > 0) {
      if (map(losers, 'index').includes(vote[0])) {
        vote.shift()
      }
    }
  })

  console.log('VOTES', votes)
  return countVotes(candidates, votes, false, rounds + 1)
}