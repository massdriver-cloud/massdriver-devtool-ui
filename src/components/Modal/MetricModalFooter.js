import stylin from 'utils/stylin'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

const MetricModalFooter = ({
  onCloseClick,
  onConfirmClick,
  isConfirmLoading,
  confirmText,
  disableSubmit
}) => (
  <Footer>
    <CancelButton variant='outlined' size='small' onClick={onCloseClick}>
      Cancel
    </CancelButton>
    <ConfirmButton
      variant='contained'
      size='small'
      loading={isConfirmLoading}
      onClick={onConfirmClick}
      disabled={disableSubmit}
    >
      {confirmText}
    </ConfirmButton>
  </Footer>
)

export default MetricModalFooter

const Footer = stylin(Box)({
  px: '12px',
  pb: '12px',
  pt: '40px'
})

const CancelButton = stylin(Button)({
  borderRadius: '4px',
  fontWeight: 400,
  fontSize: '13px'
})

const ConfirmButton = stylin(LoadingButton)({
  ml: '20px',
  borderRadius: '4px',
  fontWeight: 400,
  fontSize: '13px'
})
