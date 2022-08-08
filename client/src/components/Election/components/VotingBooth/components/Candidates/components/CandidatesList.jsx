/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd'
import Candidate from './Candidate'

function CandidatesList({ candidates, vote }) {
  const handleDragEnd = () => {
    console.log('HANDLE DRAG END')
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {vote.filter((v) => !v.isDiscarded).map(({ candidate: candidateIndex }, index) => (
              <Draggable
                draggableId={candidates[candidateIndex].id}
                index={index}
                key={candidates[candidateIndex].id}
              >
                {(providedDrag) => (
                  <div
                    ref={providedDrag.innerRef}
                    {...providedDrag.draggableProps}
                    {...providedDrag.dragHandleProps}
                  >
                    <Candidate
                      candidate={candidates[candidateIndex]}
                      index={index}
                      key={candidates[candidateIndex].id}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

CandidatesList.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  vote: PropTypes.arrayOf(
    PropTypes.shape({
      isDiscarded: PropTypes.bool.isRequired,
      candidate: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
}

export default CandidatesList
