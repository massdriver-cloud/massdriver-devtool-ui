import React from 'react'
import PropTypes from 'prop-types'
import stylin from 'utils/stylin'

import Modal from 'components/Modal/Modal'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

const ConfirmationModal = ({
  title,
  description,
  confirmText,
  isDanger,
  isOpen,
  onCloseClick,
  onConfirmClick,
  isLoading,
  ...props
}) => (
  <Modal
    isOpen={isOpen}
    title={title || 'Confirm'}
    onCloseClick={onCloseClick}
    fullWidth
    maxWidth='sm'
    {...props}
  >
    <Contents>
      {isDanger && <DangerIcon color='warning' />}
      <Description>
        {description || 'Are you sure that you want to do this?'}
      </Description>
    </Contents>
    <Actions>
      <Button variant='outlined' onClick={onCloseClick}>
        Cancel
      </Button>
      <ConfirmButton
        variant='contained'
        onClick={onConfirmClick}
        loading={isLoading}
      >
        {confirmText || 'Confirm'}
      </ConfirmButton>
    </Actions>
  </Modal>
)

export default ConfirmationModal

ConfirmationModal.propTypes = {
  title: PropTypes.string,
  confirmText: PropTypes.string,
  isDanger: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirmClick: PropTypes.func
}

const Contents = stylin(Box)({
  p: '10px',
  pb: '16px',
  display: 'flex'
})

const Actions = stylin(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  mt: '10px'
})

const ConfirmButton = stylin(LoadingButton)({
  ml: '20px',
  '&.MuiLoadingButton-loading': {
    border: theme => `1px solid ${theme.palette.primary.light}`
  }
})

const Description = stylin(Typography)({
  fontSize: '16px',
  ml: '12px'
})

const DangerIcon = stylin(ReportProblemIcon)({
  ml: '10px',
  mr: '6px',
  '&.MuiSvgIcon-root': {
    height: '45px',
    width: '45px'
  }
})
