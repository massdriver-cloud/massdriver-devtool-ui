import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ModalFooter from './ModalFooter'
import ModalContent from './ModalContent'
import ModalHeader from './ModalHeader'

export const ModalActionButtons = ({
  onCloseClick,
  onConfirmClick,
  cancelLabel,
  confirmLabel,
  submitDisabled
}) => (
  <>
    {cancelLabel && (
      <Button onClick={onCloseClick} color='primary' variant='outlined'>
        {cancelLabel}
      </Button>
    )}
    {confirmLabel && (
      <Button
        autoFocus
        onClick={onConfirmClick}
        variant='contained'
        color='primary'
        disabled={submitDisabled}
        xs={{ marginLeft: '8px' }}
      >
        {confirmLabel}
      </Button>
    )}
  </>
)

export const Modal = ({
  isOpen,
  onCloseClick,
  title,
  icon,
  cancelLabel,
  confirmLabel,
  onConfirmClick,
  submitDisabled,
  children,
  footer,
  tour,
  sx, // <-- applied to the modal content
  styles,
  modalStyles,
  hideFooter,
  hideDividers,
  disableClickAwayClose,
  id,
  ...restProps
}) => (
  <Dialog
    onClose={!disableClickAwayClose ? onCloseClick : undefined}
    aria-labelledby='modal-title'
    open={isOpen}
    sx={modalStyles}
    maxWidth='md'
    id={id}
    {...restProps}
  >
    <ModalHeader
      id='modal-title'
      icon={icon}
      tour={tour}
      onClose={onCloseClick}
    >
      {title}
    </ModalHeader>
    <ModalContent dividers={!hideDividers && !!title} sx={sx} styles={styles}>
      {children}
    </ModalContent>
    {!hideFooter && (footer || cancelLabel || confirmLabel) && (
      <ModalFooter>
        {footer ? ( // eslint-disable-line
          footer
        ) : (
          <ModalActionButtons
            cancelLabel={cancelLabel}
            confirmLabel={confirmLabel}
            onCloseClick={onCloseClick}
            onConfirmClick={onConfirmClick}
            submitDisabled={submitDisabled}
          />
        )}
      </ModalFooter>
    )}
  </Dialog>
)

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onCloseClick: PropTypes.func,
  onConfirmClick: PropTypes.func,
  submitDisabled: PropTypes.bool,
  title: PropTypes.node,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  children: PropTypes.any,
  footer: PropTypes.node,
  modalStyles: PropTypes.object,
  sx: PropTypes.object,
  styles: PropTypes.object
}

Modal.defaultProps = {
  isOpen: false,
  onCloseClick: undefined,
  onConfirmClick: undefined,
  submitDisabled: false,
  title: undefined,
  cancelLabel: undefined,
  confirmLabel: undefined,
  children: undefined,
  footer: undefined,
  sx: undefined,
  styles: undefined,
  modalStyles: undefined
}

export default Modal
