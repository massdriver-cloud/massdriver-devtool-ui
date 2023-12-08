import React from 'react'
import stylin from '../utils/stylin'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const LoadingSpinner = ({
  isSmall = false,
  delay = '0ms',
  shouldFadeIn = true,
  message,
  ...props
}) => (
  <SpinnerContainer small={isSmall} {...props}>
    <Fade
      in={shouldFadeIn}
      unmountOnExit
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Stack alignItems='center'>
        <CircularProgress sx={{ mb: message ? '30px' : 0 }} />
        {typeof message === 'string' ? (
          <Typography variant={isSmall ? 'body1' : 'h3'} textAlign='center'>
            {message}
          </Typography>
        ) : (
          message
        )}
      </Stack>
    </Fade>
  </SpinnerContainer>
)

export default LoadingSpinner

const SpinnerContainer = stylin('div', ['small'])(props => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: props.small ? '10%' : '20%'
}))
