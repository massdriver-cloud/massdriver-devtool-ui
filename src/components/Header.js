import stylin from 'utils/stylin'
import LinearHeaderLogo from 'components/LinearHeaderLogo'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'

const Header = ({ children }) => (
  <StyledAppBar
    elevation={0}
    position='static'
  >
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <LeftBar>
        <LinearHeaderLogo />
      </LeftBar>
      <CenterBar />
      <RightBar>
        {children}
      </RightBar>
    </Toolbar>
  </StyledAppBar>
)

export default Header

const StyledAppBar = stylin(AppBar)({
  color: 'white',
  pl: '6px',
  pr: '20px',
  py: '12px',
  position: 'sticky',
  top: 0,
  zIndex: 1100
})

const LeftBar = stylin(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const CenterBar = stylin(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const RightBar = stylin(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})
