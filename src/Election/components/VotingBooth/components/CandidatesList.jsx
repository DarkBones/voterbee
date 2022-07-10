import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd'
import style from './CandidatesList.module.scss'
import Grid from 'shared/Grid'

const Candidate = ({ candidate, index }) => {
  return (
    <div className={style.candidate_container}>
      <div className={style.candidate}>
        <div className={style.grid_container}>
          <Grid container>
            <Grid item style={{ width: '70px' }} alignItems="center">
              <div className={style.index_box}>
                <div style={{
                  transform: `rotate(-7.5deg)`,
                }}>
                  {index + 1}
                </div>
              </div>
            </Grid>
            <Grid item xs>
              <div className={style.candidate_value}>
                {candidate}
                {index === 2 && (
                  <span>this is a candidate with a very, very, very, in fact rediculously long name. Phew, that took a while to type out. Vote for me! I should really explain what this candidate is against and for in greater detail.</span>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
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
    const rotateRange = 15
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
                    <Candidate
                      candidate={candidate}
                      index={index}
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

export default CandidatesList