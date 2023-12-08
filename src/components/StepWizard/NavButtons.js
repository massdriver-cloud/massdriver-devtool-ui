import PropTypes from 'prop-types'
import stylin from '../../utils/stylin'

import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'

const NavButtons = ({
  previousButtonProps,
  nextButtonProps,
  completeButtonProps,
  navProps
}) => (
  <Nav {...navProps}>
    {previousButtonProps && (
      <NavButton variant='outlined' {...previousButtonProps}>
        {previousButtonProps?.label || 'Back'}
      </NavButton>
    )}
    {nextButtonProps && (
      <NavButton variant='contained' {...nextButtonProps}>
        {nextButtonProps?.label || 'Next'}
      </NavButton>
    )}
    {completeButtonProps && (
      <CompleteButton variant='contained' {...completeButtonProps}>
        {completeButtonProps?.label || 'Complete'}
      </CompleteButton>
    )}
  </Nav>
)

export default NavButtons

NavButtons.propTypes = {
  previousButtonProps: PropTypes.object,
  nextButtonProps: PropTypes.object,
  completeButtonProps: PropTypes.object,
  navProps: PropTypes.object
}

const Nav = stylin(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%'
})

const NavButton = stylin(LoadingButton)({
  mx: '10px',
  height: '45px',
  '&.MuiLoadingButton-loading': {
    border: theme => `1px solid ${theme.palette.primary.light}`,
    backgroundColor: `rgba(0, 0, 0, 0.1)`
  }
})

const CompleteButton = stylin(LoadingButton)({
  mx: '10px',
  height: '45px',
  minWidth: '100px',
  '&.MuiLoadingButton-loading': {
    border: theme => `1px solid ${theme.palette.primary.light}`,
    backgroundColor: `rgba(0, 0, 0, 0.1)`
  }
})
