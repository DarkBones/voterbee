import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { get, post } from 'shared/utils'
import {
  UserContext,
  DbContext,
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
  const [user, setUser] = useState({})

  useEffect(() => {
    const getNewId = () => get('users/new_id')
      .then(({
        user_id: newId,
        secret: newSecret,
        add_candidate_id: newAddCandidateId,
      }) => {
        localStorage.setItem('user_id', newId)
        localStorage.setItem('secret', newSecret)
        localStorage.setItem('add_candidate_id', newAddCandidateId)
        setUser({
          id: newId,
          secret: newSecret,
          addCandidateId: newAddCandidateId,
        })
      })

    if (!user.id) {
      const id = localStorage.getItem('user_id')
      const userSecret = localStorage.getItem('secret')
      const userAddCandidateId = localStorage.getItem('add_candidate_id')

      if (id && userSecret && userAddCandidateId) {
        post(
          'users/secret_check',
          {
            id,
            secret: userSecret,
            add_candidate_id: userAddCandidateId,
          },
        ).then(({ status }) => {
          if (status === 200) {
            setUser({
              id,
              secret: userSecret,
              addCandidateId: userAddCandidateId,
            })
            return
          }

          getNewId()
        })
      } else {
        getNewId()
      }
    }
  }, [user])

  return (
    <DbContext.Provider value={db}>
      <UserContext.Provider value={user}>
        {children}
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
