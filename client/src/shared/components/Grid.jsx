import PropTypes from 'prop-types'
import { set } from 'lodash'
import { Grid as MUIGrid } from '@mui/material'

function Grid({
  alignItems,
  children,
  className,
  container,
  spacing,
  style,
  width,
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

  if (width) {
    set(gridStyle, 'width', `${width}px`)
  }

  return container
    ? (
      <MUIGrid
        container
        spacing={spacing}
        style={gridStyle}
        alignItems={alignItems}
        className={className}
      >
        {children}
      </MUIGrid>
    )
    : (
      <MUIGrid
        item
        className={className}
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
  alignItems: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'stretch',
    'baseline',
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  container: PropTypes.bool,
  spacing: PropTypes.number,
  style: PropTypes.shape({}),
  width: PropTypes.number,
  xs: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['auto']),
  ]),
  sm: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['auto']),
  ]),
  md: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['auto']),
  ]),
  lg: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['auto']),
  ]),
  xl: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['auto']),
  ]),
}

Grid.defaultProps = {
  alignItems: 'center',
  className: null,
  container: false,
  spacing: 2,
  style: {},
  width: null,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
}

export default Grid
