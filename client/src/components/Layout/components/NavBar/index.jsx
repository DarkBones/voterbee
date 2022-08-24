import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Grid } from 'shared/components'
import Donate from './components/Donate'
import style from './NavBar.module.scss'

function NavBar() {
  const { t } = useTranslation()
  return (
    <div className={style.navbar}>
      <Grid container>
        <Grid xs={12} sm={12} md />
        <Grid xs>
          <Link to="/">
            <img src="/logo.png" alt="voterbee" />
          </Link>
          <p>{t('navbar.tagline')}</p>
        </Grid>
        <Grid xs={12} sm={12} md>
          <Donate />
        </Grid>
      </Grid>
    </div>
  )
}

export default NavBar
