import PropTypes from 'prop-types'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const translationsEn = {
  navbar: {
    tagline: 'Preferential voting made easy and anonymous!!!123',
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationsEn },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

function I18n({ children }) {
  return children
}

I18n.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default I18n
