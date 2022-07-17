import PropTypes from 'prop-types'
import style from './Panel.module.scss'

function Panel({ children, title }) {
  return (
    <div className={style.panel}>
      {title && (
        <h3 className={style.title}>{title}</h3>
      )}
      {children}
    </div>
  )
}

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
}

Panel.defaultProps = {
  title: null,
}

export default Panel
