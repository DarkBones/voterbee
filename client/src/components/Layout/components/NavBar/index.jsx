import { Link } from 'react-router-dom'
import style from './NavBar.module.scss'

function NavBar() {
  return (
    <div className={style.navbar}>
      <Link to="/">
        <img src="/logo.png" alt="voterbee" />
      </Link>
      <p>Preferential voting made easy and anonymous</p>
    </div>
  )
}

export default NavBar
