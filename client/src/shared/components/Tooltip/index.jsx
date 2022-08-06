import PropTypes from 'prop-types'
import { Tooltip as MUITooltip } from '@mui/material'

function Tooltip({
  children,
  title,
  placement,
  arrow,
}) {
  return (
    <MUITooltip
      title={title}
      placement={placement}
      arrow={arrow}
    >
      {children}
    </MUITooltip>
  )
}

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  placement: PropTypes.oneOf([
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
  arrow: PropTypes.bool,
}

Tooltip.defaultProps = {
  placement: 'top',
  arrow: true,
}

export default Tooltip
