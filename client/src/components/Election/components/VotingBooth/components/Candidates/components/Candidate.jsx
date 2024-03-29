import PropTypes from 'prop-types'
import { BiTrash } from 'react-icons/bi'
import { Grid, Button } from 'shared/components'
import { Switch } from 'shared/components/forms'
import style from './Candidate.module.scss'

function Candidate({
  candidate,
  index,
  onDiscardCandidate,
  isDiscarded,
  onDeleteCandidate,
  userCanDeleteCandidate,
}) {
  const handleDiscardCandidate = ({ target: { checked } }) => {
    onDiscardCandidate(candidate.id, checked)
  }

  const candidateContainerClass = isDiscarded
    ? style.candidate_container_discarded
    : style.candidate_container

  return (
    <div className={candidateContainerClass}>
      {userCanDeleteCandidate(candidate.id) && (
        <div className={style.delete_candidate_button_container}>
          <div className={style.delete_candidate_button}>
            <Button
              variant="icon-text"
              tabIndex={-1}
              onClick={() => onDeleteCandidate(candidate.id)}
            >
              <BiTrash size={20} />
            </Button>
          </div>
        </div>
      )}
      <div className={style.candidate}>
        <Grid container className={style.grid_container}>
          <Grid className={style.index_box} alignItems="center">
            <div className={style.index_number}>
              {index < 0 ? '-' : index + 1}
            </div>
          </Grid>
          <Grid xs className={style.candidate_value}>
            {candidate.name}
          </Grid>
          <Grid className={style.switch}>
            <Switch
              checked={!isDiscarded}
              onChange={handleDiscardCandidate}
            />
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
  onDiscardCandidate: PropTypes.func.isRequired,
  isDiscarded: PropTypes.bool.isRequired,
  onDeleteCandidate: PropTypes.func.isRequired,
  userCanDeleteCandidate: PropTypes.func.isRequired,
}

export default Candidate
