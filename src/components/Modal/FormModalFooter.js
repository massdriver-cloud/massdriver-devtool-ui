import Button from '@mui/material/Button'
import ModalFooter from 'components/Modal/ModalFooter'

const FormModalFooter = ({ onCloseClick }) => (
  <ModalFooter
    sx={{
      borderTop: 'solid 1px #e0e0e0',
      padding: '16px 5px 5px',
      marginTop: '20px'
    }}
  >
    <Button onClick={onCloseClick} color='primary' variant='outlined'>
      Cancel
    </Button>
    <Button
      autoFocus
      type='submit'
      variant='contained'
      color='primary'
      xs={{ marginLeft: '8px' }}
    >
      Add to canvas
    </Button>
  </ModalFooter>
)

export default FormModalFooter
