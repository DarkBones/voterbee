const getOrSetId = (key, length = 10) => {
  let id = localStorage.getItem(key)
  if (!id) {
    id = Math.random().toString(36).substr(2, length).toUpperCase()
    localStorage.setItem(key, id)
  }
  return id
}

export const getOrSetUserId = () => {
  return {
    id: getOrSetId('user_id'),
    idSecret: getOrSetId('user_id_secret', 36),
  }
}

export const getValues = (obj) => {
  const values = []
  if (!obj) return

  Object.keys(obj).forEach(key => {
    values.push({
      ...obj[key],
      fb_key: key,
    })
  })
  return values
}

export const randomArray = (length) => {
  let array = []
  for (let i = 0; i < length; i++) {
    array.push(i)
  }

  let currentIndex = array.length, randomIndex
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}