import { useState } from 'react'
import stylin from '../utils/stylin'

import { Collapse as MuiCollapse } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

const Collapse = ({ children, header, defaultState = true, sx }) => {
  const [isOpen, setIsOpen] = useState(defaultState)

  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return (
    <>
      <Header onClick={isOpen ? close : open} sx={sx}>
        {header}
        {isOpen ? (
          <ExpandMoreIcon sx={{ ml: '16px' }} />
        ) : (
          <ExpandLessIcon sx={{ ml: '16px' }} />
        )}
      </Header>
      <MuiCollapse in={isOpen}>
        <Divider />
        {children}
      </MuiCollapse>
    </>
  )
}

export default Collapse

const Header = stylin(Box)({
  px: 3,
  py: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '80px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(117, 133, 255, 0.1)'
  }
})
