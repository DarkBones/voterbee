import { MIN_CANDIDATES } from './constants'
import { get } from 'lodash'

export const validateElectionConfig = (election) => {
  const errors = []
  const candidates = get(election, 'candidates', [])
  if (get(election, 'name', '').length === 0) {
    errors.push('Election name can\'t be empty')
  }
  if (candidates.includes('')) {
    errors.push('All candidates must be filled in')
  }
  if (candidates.length < MIN_CANDIDATES) {
    errors.push(`There must be at least ${MIN_CANDIDATES} candidates`)
  }
  return errors
}