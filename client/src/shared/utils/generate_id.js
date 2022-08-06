const { times, random } = require('lodash')

const generateUniqueId = (existingIds, length = 5, upperCase = true) => {
  const newId = () => {
    const i = times(length, () => random(35).toString(36)).join('')
    return upperCase ? i.toUpperCase() : i
  }

  let id = newId()
  while (existingIds.includes(id)) {
    id = newId()
  }
  return id
}

export default generateUniqueId
