import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { get } from 'shared/utils'
import { UserContext } from 'contexts'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translations from 'i18n'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

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
