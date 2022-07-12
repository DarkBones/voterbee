import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'

const Spinner = ({ color = 'black', size = 35 }) => {
  return (
    <ScaleLoader color={color} loading={true} height={size} />
  )
}

export default Spinner