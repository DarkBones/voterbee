import React from 'react'
import { Grid as MUIGrid } from '@mui/material'

const Grid = ({
  children,
  container = false,
  spacing = 2,
  xs = 6,
  style,
  alignItems = "center",
  ...otherProps
}) => {

  const gridStyle = {
    alignItems,
    ...style,
  }

  return container
    ? (
      <MUIGrid
        container
        spacing={spacing}
        style={gridStyle}
        alignItems={alignItems}
        {...otherProps}
      >
        {children}
      </MUIGrid>
    )
    : (
      <MUIGrid
        item
        xs={xs}
        style={gridStyle}
        {...otherProps}
      >
        {children}
      </MUIGrid>
    )
}

export default Grid