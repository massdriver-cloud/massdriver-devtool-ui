import React from 'react'
import { action } from '@storybook/addon-actions'

import Modal from 'components/Modal/Modal'
import ModalDemo from 'components/Modal/ModalDemo'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default {
  title: 'Components/Modal',
  component: Modal
}

const CustomModalFooter = ({ onCloseClick, onConfirmClick }) => (
  <>
    <Button onClick={onCloseClick} color='secondary'>
      Cancel
    </Button>
    <Button autoFocus onClick={onConfirmClick} color='primary'>
      Do The Thing
    </Button>
  </>
)

const DefaultTemplate = args => (
  <ModalDemo buttonLabel='Open Basic Modal'>
    {({ isOpen, onCloseClick }) => (
      <Modal
        isOpen={isOpen}
        title='Basic Modal'
        onCloseClick={onCloseClick}
        onConfirmClick={action('You said yes!')}
        cancelLabel='Nope'
        confirmLabel='Yup'
        {...args}
      >
        <Typography variant='h5' gutterBottom>
          This is basic modal content.
        </Typography>
        <Typography variant='body1' gutterBottom>
          You can add whatever children you like and it will render here as
          modal content.
        </Typography>
      </Modal>
    )}
  </ModalDemo>
)

export const Default = DefaultTemplate.bind({})
Default.args = {}

const CustomFooterTemplate = args => (
  <ModalDemo buttonLabel='Open Custom Footer Modal'>
    {({ isOpen, onCloseClick }) => (
      <Modal
        isOpen={isOpen}
        title='Modal with Custom Footer Component'
        onCloseClick={onCloseClick}
        footer={
          <CustomModalFooter
            onCloseClick={onCloseClick}
            onConfirmClick={action('Doing the thing.')}
          />
        }
        {...args}
      >
        <Typography variant='h5' gutterBottom>
          Custom footer component.
        </Typography>
        <Typography variant='body1' gutterBottom>
          This modal uses a custom footer component passed from the parent. This
          is useful when you need to do something different than just buttons,
          like the checkbox for example.
        </Typography>
      </Modal>
    )}
  </ModalDemo>
)

export const WithCustomFooter = CustomFooterTemplate.bind({})
WithCustomFooter.args = {}
