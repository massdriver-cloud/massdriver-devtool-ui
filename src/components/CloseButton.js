import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const CloseButton = props => (
  <IconButton aria-label='close' {...props}>
    <CloseIcon />
  </IconButton>
)

export default CloseButton
