import React from 'react'
import { Link } from 'react-router-dom'
import style from './NavBar.module.scss'

const NavBar = () => {
  return (
    <div className={style.navbar}>
      <Link to="/">
        <h1>VoteBee</h1>
      </Link>
      <p>Preferential voting made easy and anonymous</p>
    </div>
  )
}

export default NavBar