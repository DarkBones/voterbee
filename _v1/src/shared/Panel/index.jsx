import React from 'react'
import style from './Panel.module.scss'

const Panel = ({ children }) => {
  return (
    <div className={style.panel}>
      {children}
    </div>
  )
}

export default Panel