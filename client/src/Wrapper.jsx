import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { get } from 'shared/utils'
import { UserContext } from 'contexts'

function Wrapper({ children }) {
  const [user, setUser] = useState('')

  useEffect(() => {
    if (!user) {
      const id = localStorage.getItem('user_id')

      if (id) {
        setUser(id)
      } else {
        get('users/new_id')
          .then(({ user_id: newId }) => {
            localStorage.setItem('user_id', newId)
            setUser(newId)
          })
      }
    }
  }, [user])

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Wrapper
