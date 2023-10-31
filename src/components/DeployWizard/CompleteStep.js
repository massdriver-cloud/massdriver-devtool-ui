import stylin from '../../utils/stylin'

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

const CompleteStep = ({
  action,
  status,
  onDecommissionClick,
  isLoading,
}) => (
  <Container spacing={6}>
    <Box>
      <Title variant="h2">{status === 'COMPLETED' ? `Bundle Successfully ${action}ed` : `Bundle Failed ${action}ing`}</Title>
      <Description>{status === 'COMPLETED' ? 'Please check in your cloud console to confirm.' : `There was an issue ${action}ing your bundle. Please check you container logs for more information.`}</Description>
    </Box>
    {action === 'provision' ? (
      <DecommissionButton
        variant="contained"
        onClick={onDecommissionClick}
        loading={isLoading}
      >
        Decommission
      </DecommissionButton>
    ) : (
      <BackToAppButton
        variant="contained"
        href="/"
      >
        Back to App
      </BackToAppButton>
    )}
  </Container>
)

export default CompleteStep

const Container = stylin(Stack)({
  display: 'flex',
  width: '100%',
  height: '100%',
  py: '40px',
  px: '80px'
})

const Title = stylin(Typography)({
  textTransform: 'capitalize',
})

const Description = stylin(Typography)({
  mt: '10px',
  fontSize: '16px'
})

const DecommissionButton = stylin(LoadingButton)({
  mt: '100px',
  width: '60%',
  mx: 'auto'
})

const BackToAppButton = stylin(Button)({
  mt: '100px',
  width: '60%',
  mx: 'auto'
})
