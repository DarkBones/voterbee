import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { get } from 'shared/utils'
import { UserContext } from 'contexts'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import translations from 'i18n'

const detectionOptions = {
  order: ['path', 'cookie', 'navigator', 'localStorage', 'subdomain', 'queryString', 'htmlTag'],
  lookupFromPathIndex: 0,
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      fr: { translation: translations.fr },
    },
    fallbackLng: 'en',
    detection: detectionOptions,
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
