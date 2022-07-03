import React from 'react'
import { Grid as MUIGrid } from '@mui/material'

const Grid = ({
  children,
  container = false,
  spacing = 2,
  xs = 6,
  style,
}) => {

  const gridStyle = {
    alignItems: "center",
    ...style,
  }

  return container
    ? (
      <MUIGrid
        container
        spacing={spacing}
        style={gridStyle}
      >
        {children}
      </MUIGrid>
    )
    : (
      <MUIGrid
        item
        xs={xs}
        style={gridStyle}
      >
        {children}
      </MUIGrid>
    )
}

export default Grid