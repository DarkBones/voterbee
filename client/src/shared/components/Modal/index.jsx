import PropTypes from 'prop-types'
import {
  Modal as MUIModal,
  Box,
  Typography,
} from '@mui/material'
import { Spacer } from 'shared/components'
import style from './Modal.module.scss'

function Modal({
  isOpen,
  children,
  width,
  height,
  title,
  footer,
  onClose,
}) {
  const sx = {
    width: `${width}px`,
    height: `${height}px`,
  }
  return (
    <MUIModal
      open={isOpen}
      onClose={onClose}
    >
      <Box className={style.modal_container} sx={sx}>
        <div>
          {title && (
            <>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                {title}
              </Typography>
              <hr />
            </>
          )}
          <div className={style.modal_body}>
            {children}
          </div>
          {footer && (
            <div className={style.modal_footer}>
              <Spacer />
              <hr />
              {footer}
            </div>
          )}
        </div>
      </Box>
    </MUIModal>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClose: PropTypes.func,
}

Modal.defaultProps = {
  width: 500,
  height: 250,
  title: null,
  footer: null,
  onClose: () => { },
}

export default Modal
