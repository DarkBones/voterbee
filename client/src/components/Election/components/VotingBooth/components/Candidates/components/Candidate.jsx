import PropTypes from 'prop-types'
import { Grid } from 'shared/components'
import style from './Candidate.module.scss'

function Candidate({ candidate, index }) {
  return (
    <div className={style.candidate_container}>
      <div className={style.candidate}>
        <Grid container className={style.grid_container}>
          <Grid className={style.index_box} alignItems="center">
            <div className={style.index_number}>
              {index}
            </div>
          </Grid>
          <Grid xs className={style.candidate_value}>
            {candidate.name}
          </Grid>
          <Grid className={style.switch}>
            S
          </Grid>
        </Grid>
      </div>
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
