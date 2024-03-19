import React from 'react'
import Button from '@mui/material/Button'

const ModalDemo = ({ buttonLabel = 'Open Modal', children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const openModal = () => setIsOpen(true)
  const onCloseClick = () => setIsOpen(false)

  return (
    <>
      <Button variant='contained' color='primary' onClick={openModal}>
        {buttonLabel}
      </Button>
      {typeof children === 'function'
        ? children({ isOpen, onCloseClick })
        : children}
    </>
  )
}

export default ModalDemo
