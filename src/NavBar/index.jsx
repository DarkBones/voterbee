import React from 'react'
import { Link } from 'react-router-dom'
import style from './NavBar.module.scss'
import Donate from './components/Donate'

const NavBar = () => {
  return (
    <div className={style.navbar}>
      <Link to="/">
        <img src="/logo.png" alt="voterbee" />
      </Link>
      <p>Preferential voting made easy and anonymous</p>
      <Donate />
    </div>
  )
}

export default NavBar