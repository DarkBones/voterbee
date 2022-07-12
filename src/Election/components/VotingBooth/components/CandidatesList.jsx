import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd'
import { find, cloneDeep } from 'lodash'
import style from './CandidatesList.module.scss'
import Grid from 'shared/Grid'
import Switch from 'shared/FormControl/Switch'

const Candidate = ({
  candidate,
  index,
  onDiscardCandidate,
  isDiscarded,
  candidateIndex,
}) => {
  const handleDiscard = ({ target: { checked } }) => {
    onDiscardCandidate(candidateIndex, !checked)
  }
  const containerClass = isDiscarded
    ? style.candidate_container_discarded
    : style.candidate_container

  return (
    <div className={containerClass}>
      <div className={style.candidate}>
        <div className={style.grid_container}>
          <Grid container>
            <Grid item style={{ width: '70px' }} alignItems="center">
              <div className={style.index_box}>
                <div style={{
                  transform: `rotate(-7.5deg)`,
                }}>
                  {index}
                </div>
              </div>
            </Grid>
            <Grid item xs>
              <div className={style.candidate_value}>
                {candidate}
              </div>
            </Grid>
            <Grid item style={{ width: '70px' }}>
              <Switch
                checked={!isDiscarded}
                onChange={handleDiscard}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

const CandidatesList = ({ candidates, order, onChangeOrder }) => {
  const [tmpOrder, setTmpOrder] = useState([])
  useEffect(() => {
    if (!order) return

    if (tmpOrder.length > 0) {
      if (tmpOrder.join(',') !== order.join(',')) return
    } else {
      setTmpOrder(order)
    }
  }, [order, candidates, tmpOrder])

  const handleDragEnd = (result) => {
    if (!result.destination) return

    let newOrder = [...order.filter((o) => !o.isDiscarded)]
    const [removed] = newOrder.splice(result.source.index, 1)
    newOrder.splice(result.destination.index, 0, removed)
    newOrder = [...newOrder, ...order.filter((o) => o.isDiscarded)]
    setTmpOrder(newOrder)
    onChangeOrder(newOrder)
  }

  const handleDiscardCandidate = (index, discard) => {
    const newOrder = cloneDeep(tmpOrder)
    find(newOrder, (o) => o.value === index).isDiscarded = discard
    setTmpOrder(newOrder)
    onChangeOrder(newOrder)
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tmpOrder.filter((o) => !o.isDiscarded).map(({ value: candidateIndex }, index) => (
                <Draggable draggableId={index.toString()} index={index} key={index.toString()}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Candidate
                        candidateIndex={candidateIndex}
                        candidate={candidates[candidateIndex]}
                        index={index + 1}
                        onDiscardCandidate={handleDiscardCandidate}
                        isDiscarded={false}
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
      {tmpOrder.filter((o) => o.isDiscarded).map(({ value: candidateIndex }) => (
        <Candidate
          key={candidateIndex.toString()}
          candidateIndex={candidateIndex}
          candidate={candidates[candidateIndex]}
          index="-"
          onDiscardCandidate={handleDiscardCandidate}
          isDiscarded
        />
      ))}
    </>
  )
}

export default CandidatesList