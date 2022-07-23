import PropTypes from 'prop-types'
import { Grid as MUIGrid } from '@mui/material'

function Grid({
  alignItems,
  children,
  container,
  spacing,
  style,
  xs,
  sm,
  md,
  lg,
  xl,
}) {
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
      >
        {children}
      </MUIGrid>
    )
    : (
      <MUIGrid
        item
        style={gridStyle}
        xs={xs}
        sm={sm}
        md={md}
        lg={lg}
        xl={xl}
      >
        {children}
      </MUIGrid>
    )
}

Grid.propTypes = {
  alignItems: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  container: PropTypes.bool,
  spacing: PropTypes.number,
  style: PropTypes.shape({}),
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
}

Grid.defaultProps = {
  alignItems: 'center',
  container: false,
  spacing: 2,
  style: {},
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
}

export default Grid
