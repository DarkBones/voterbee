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