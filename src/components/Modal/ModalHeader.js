import React from 'react'
import stylin from 'utils/stylin'
import MuiDialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CloseIconButton from 'components/CloseButton'

const ModalHeader = ({ children, onClose, tour, icon: Icon, ...restProps }) => (
  <HeaderContainer {...restProps}>
    <TitleContainer flexDirection='row' alignItems='center'>
      {Icon && <Icon sx={{ mr: '10px' }} />}
      <Title>{children}</Title>
    </TitleContainer>
    {tour && <TourContainer>{tour}</TourContainer>}
    {onClose && (
      <CloseButton
        id='modal-close-button'
        aria-label='close'
        onClick={onClose}
      />
    )}
  </HeaderContainer>
)

export default ModalHeader

const CloseButton = stylin(CloseIconButton)({
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)'
})

const HeaderContainer = stylin(MuiDialogTitle)({
  position: 'relative',
  margin: 0,
  padding: '10px',
  minHeight: '60px'
})

const TourContainer = stylin(Box)({
  position: 'absolute',
  right: '45px',
  top: '5px'
})

const TitleContainer = stylin(Stack)({
  ml: '0px',
  pr: '42px'
})

const Title = stylin(Typography)({
  px: '12px',
  py: '8px',
  fontSize: '30px',
  fontWeight: '500',
  lineHeight: '1.15'
})
