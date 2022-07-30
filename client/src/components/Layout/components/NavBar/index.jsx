import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import style from './NavBar.module.scss'

function NavBar() {
  const { t } = useTranslation()
  return (
    <div className={style.navbar}>
      <Link to="/">
        <img src="/logo.png" alt="voterbee" />
      </Link>
      <p>{t('navbar.tagline')}</p>
    </div>
  )
}

export default NavBar
