/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd'
import Candidate from './Candidate'

function CandidatesList({
  candidates,
  onChangeVote,
  vote: voteProps,
}) {
  const [vote, setVote] = useState([])

  useEffect(() => {
    setVote(voteProps)
  }, [voteProps])

  const handleDragEnd = (result) => {
    if (!result.destination) return

    let newVote = [...vote.filter((v) => !v.isDiscarded)]
    const [removed] = newVote.splice(result.source.index, 1)
    newVote.splice(result.destination.index, 0, removed)
    newVote = [...newVote, ...vote.filter((v) => v.isDiscarded)]
    setVote(newVote)
    onChangeVote(newVote)
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
  onChangeVote: PropTypes.func.isRequired,
  vote: PropTypes.arrayOf(
    PropTypes.shape({
      isDiscarded: PropTypes.bool.isRequired,
      candidate: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
}

export default CandidatesList
