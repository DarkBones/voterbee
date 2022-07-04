export const getOrSetUserId = () => {
  let userId = localStorage.getItem('user_id')
  if (!userId) {
    userId = Math.random().toString(36).substr(2, 10).toUpperCase()
    localStorage.setItem('user_id', userId)
  }

  return userId
}