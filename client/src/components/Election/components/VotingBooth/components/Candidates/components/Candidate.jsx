import PropTypes from 'prop-types'
import style from './Candidate.module.scss'

function Candidate({ candidate, index }) {
  console.log(index)
  return (
    <div className={style.candidate}>
      {candidate.name}
    </div>
  )
}

Candidate.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

export default Candidate
