import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { get, post } from 'shared/utils'
import {
  UserContext,
  DbContext,
  SecretContext,
} from 'contexts'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import translations from 'i18n'
import db from './firebase'

const detectionOptions = {
  order: ['cookie', 'navigator', 'localStorage', 'subdomain', 'queryString', 'htmlTag'],
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      fr: { translation: translations.fr },
      nl: { translation: translations.nl },
    },
    fallbackLng: 'en',
    detection: detectionOptions,
    interpolation: {
      escapeValue: false,
    },
  })

function Wrapper({ children }) {
  const [user, setUser] = useState()
  const [secret, setSecret] = useState()

  useEffect(() => {
    if (!user) {
      const id = localStorage.getItem('user_id')
      const userSecret = localStorage.getItem('secret')
      const getNewId = !(id && userSecret)

      if (!getNewId) {
        post(
          'users/secret_check',
          {
            id,
            secret: userSecret,
          },
        ).then(({ status }) => {
          if (status === 200) {
            setUser(id)
            setSecret(userSecret)
            return
          }

          get('users/new_id')
            .then(({
              user_id: newId,
              secret: newSecret,
            }) => {
              localStorage.setItem('user_id', newId)
              localStorage.setItem('secret', newSecret)
              setUser(newId)
            })
        })
      }
    }
  }, [user, secret])

  return (
    <DbContext.Provider value={db}>
      <UserContext.Provider value={user}>
        <SecretContext.Provider value={secret}>
          {children}
        </SecretContext.Provider>
      </UserContext.Provider>
    </DbContext.Provider>
  )
}

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Wrapper
