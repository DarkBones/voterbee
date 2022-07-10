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
  const [tmpOrder, setTmpOrder] = useState([])
  useEffect(() => {
    if (tmpOrder.length > 0) {
      if (tmpOrder.join(',') !== order.join(',')) return
    } else {
      setTmpOrder(order)
    }

    const cs = []
    order.forEach((i) => {
      cs.push(candidatesInitial[i])
    })
    setCandidates(cs)
  }, [order, candidatesInitial, tmpOrder])

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const newOrder = [...order]
    const [removed] = newOrder.splice(result.source.index, 1)
    newOrder.splice(result.destination.index, 0, removed)
    const cs = []
    newOrder.forEach((i) => {
      cs.push(candidatesInitial[i])
    })
    setTmpOrder(newOrder)
    setCandidates(cs)
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