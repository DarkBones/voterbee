import { randomArray } from 'shared/utils'
import { map, cloneDeep } from 'lodash'

export const countVotes = (candidates, votes, results = null, round = 0) => {
  if (round > 1000) {
    return results
  }

  console.log(round, results)

  if (!results) {
    console.clear()
    console.log('==============')
    votes.forEach((v) => console.log(v))
    console.log('==============')

    results = {}
    results[round] = candidates.map((c, index) => {
      return {
        index: index,
        name: c,
        votes: 0,
        eliminated: false,
        round: round,
      }
    })
  } else {
    results[round] = cloneDeep(results[round - 1])
  }
  const majority = Math.floor(votes.length / 2) + 1
  const winners = []
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
    console.log('NO VOTES', results)
    const max = Math.max(...map(results[round], 'votes'))
    const output = {}
    let foundWinner = false
    Object.keys(results).forEach((r) => {
      if (!foundWinner) {
        output[r] = { ...results[r] }
      }

      const winners = []
      results[r].forEach((v, i) => {
        if (v.votes === max) {
          winners.push(v)
        }
      })

      if (winners.length > 0 && !foundWinner) {
        foundWinner = true
        return output
      }
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

  results[round].forEach((result) => {
    if (result.votes <= min) {
      result.eliminated = true
    }
  })

  votes.forEach((vote) => {
    vote.shift()
  })

  return countVotes(candidates, votes, results, round + 1)
}