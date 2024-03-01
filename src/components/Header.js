import stylin from 'utils/stylin'
import LinearHeaderLogo from 'components/LinearHeaderLogo'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

const Header = () => (
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
        <DeployButton
          variant="outlined"
          endIcon={<ArrowRightIcon sx={{ width: '25px', height: '25px' }} />}
          href='/deploy'
        >
          Provision Bundle
        </DeployButton>
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

const DeployButton = stylin(Button)({
  borderRadius: '4px',
  color: 'white'
})
