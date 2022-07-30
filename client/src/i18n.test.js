import { keys } from 'lodash'
import translations from 'i18n'

function translationKeys(obj, allKeys = []) {
  const newKeys = keys(obj)
  for (let i = 0; i < newKeys.length; i++) {
    const newObj = obj[newKeys[i]]
    if (typeof (newObj) === 'object') {
      translationKeys(newObj, allKeys)
    } else {
      allKeys.push(newKeys[i])
    }
  }

  return allKeys
}

test('translation keys are identical for each language', () => {
  const tKeys = []
  keys(translations).forEach((lng) => {
    tKeys.push(translationKeys(translations[lng]))
  })

  for (let i = 1; i < tKeys.length; i++) {
    expect(tKeys[i]).toEqual(tKeys[0])
  }
})
