/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  cloneDeep,
  set,
  get,
  findIndex,
  find,
  map,
} from 'lodash'
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
  onDeleteCandidate,
  userCanDeleteCandidate,
}) {
  const [vote, setVote] = useState([])

  useEffect(() => {
    setVote(voteProps)
  }, [voteProps])

  useEffect(() => {
    if (vote.length > 0 && vote.length !== get(candidates, 'length', 0)) {
      const newVote = vote.filter((v) => map(candidates, 'id').includes(v.candidate))
      onChangeVote(newVote)
    }
  }, [candidates, onChangeVote, vote])

  const handleDragEnd = (result) => {
    if (!result.destination) return

    let newVote = [...vote.filter((v) => !v.isDiscarded)]
    const [removed] = newVote.splice(result.source.index, 1)
    newVote.splice(result.destination.index, 0, removed)
    newVote = [...newVote, ...vote.filter((v) => v.isDiscarded)]
    setVote(newVote)
    onChangeVote(newVote)
  }

  const handleDiscardCandidate = (candidateId, checked) => {
    const newVote = cloneDeep(vote)
    const voteIndex = findIndex(vote, (v) => v.candidate === candidateId)
    set(newVote, `[${voteIndex}].isDiscarded`, !checked)
    setVote(newVote)
    onChangeVote(newVote)
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {vote.filter((v) => !v.isDiscarded && map(candidates, 'id').includes(v.candidate)).map(({ candidate: candidateId }, index) => (
                <Draggable
                  draggableId={candidateId}
                  index={index}
                  key={candidateId}
                >
                  {(providedDrag) => (
                    <div
                      ref={providedDrag.innerRef}
                      {...providedDrag.draggableProps}
                      {...providedDrag.dragHandleProps}
                    >
                      <Candidate
                        candidate={find(candidates, (c) => c.id === candidateId)}
                        index={index}
                        key={candidateId}
                        onDiscardCandidate={handleDiscardCandidate}
                        isDiscarded={false}
                        onDeleteCandidate={onDeleteCandidate}
                        userCanDeleteCandidate={userCanDeleteCandidate}
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
      {vote.filter((v) => v.isDiscarded && map(candidates, 'id').includes(v.candidate)).map(({ candidate: candidateId }) => (
        <Candidate
          candidate={find(candidates, (c) => c.id === candidateId)}
          index={-1}
          key={candidateId}
          onDiscardCandidate={handleDiscardCandidate}
          isDiscarded
          onDeleteCandidate={onDeleteCandidate}
        />
      ))}
    </>
  )
}

CandidatesList.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onChangeVote: PropTypes.func.isRequired,
  vote: PropTypes.arrayOf(
    PropTypes.shape({
      isDiscarded: PropTypes.bool.isRequired,
      candidate: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onDeleteCandidate: PropTypes.func.isRequired,
  userCanDeleteCandidate: PropTypes.func.isRequired,
}

CandidatesList.defaultProps = {
  candidates: [],
}

export default CandidatesList
