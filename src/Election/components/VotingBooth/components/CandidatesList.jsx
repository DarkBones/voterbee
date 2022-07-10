import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd'

const Candidate = ({ candidate }) => {
  return (
    <div style={{ width: '100%', height: '50px', backgroundColor: 'red' }}>{candidate}</div>
  )
}

const CandidatesList = ({ candidates: candidatesInitial, order, onChangeOrder }) => {
  const [candidates, setCandidates] = useState([])
  const [tmpOrder, setTmpOrder] = useState(order)
  useEffect(() => {
    const cs = []
    let o = tmpOrder
    if (o.length === 0) o = order
    o.forEach((i) => {
      cs.push(candidatesInitial[i])
    })
    setCandidates(cs)
  }, [order, tmpOrder])

  const handleDragEnd = (result) => {
    if (!result.destination) return

    let newOrder = [...order]
    if (tmpOrder.length > 0) {
      newOrder = [...tmpOrder]
    }
    const [removed] = newOrder.splice(result.source.index, 1)
    newOrder.splice(result.destination.index, 0, removed)
    setTmpOrder(newOrder)
    onChangeOrder(newOrder)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" >
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {candidates.map((candidate, index) => (
              <Draggable draggableId={index.toString()} index={index} key={index.toString()}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Candidate candidate={candidate} />
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

export default CandidatesList