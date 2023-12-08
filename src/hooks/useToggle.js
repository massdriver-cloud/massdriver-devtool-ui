import { useState } from 'react'

const useToggle = (defaultState = false) => {
  const [isOpen, setIsOpen] = useState(defaultState)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)
  return { isOpen, close, open }
}

export default useToggle
