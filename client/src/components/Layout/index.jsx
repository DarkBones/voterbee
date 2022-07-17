import PropTypes from 'prop-types'
import NavBar from './components/NavBar'
import style from './Layout.module.scss'

function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className={style.container}>
        {children}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Layout
