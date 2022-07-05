import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'

const Spinner = ({ color = 'black', size = 20 }) => {
  return (
    <ScaleLoader color={color} loading={true} height={size} />
  )
}

export default Spinner