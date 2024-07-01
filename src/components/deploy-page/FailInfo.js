import stylin from 'utils/stylin'

import AutoDecommissionBar from 'components/deploy-page/AutoDecommissionBar.container'
import ResourceProgressViewer from 'components/ResourceProgressViewer/ResourceProgressViewer'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'

const FailInfo = ({
  isOpen,
  open,
  close,
  action,
  status,
  deploymentEvents
}) => (
  <>
    <AutoDecommissionBar />
    <Container>
      <Header>
        <Title>Bundle provisioning failed</Title>
        <Description>
          There was an issue when provisioning your bundle. Check your <strong>provisioning logs</strong> for more information.
        </Description>
      </Header>
      <Column>
        <Button
          fullWidth
          variant='contained'
          onClick={open}
        >
          View provisioning logs
        </Button>
      </Column>
    </Container>
    <LogsDrawer
      hideBackdrop
      anchor='bottom'
      open={isOpen}
      variant="persistent"
    >
      <ResourceProgressViewer
        formattedAction={`${action}ing`}
        action={action || ''}
        resources={deploymentEvents}
        deploymentStatus={status}
        onClose={close}
      />
    </LogsDrawer>
  </>
)

export default FailInfo

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  px: '20px',
  pt: '10px'
})

const Header = stylin(Box)({

})

const Title = stylin(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.grey[900]
}))

const Description = stylin(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[700]
}))

const Column = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  pt: '20px'
})

const LogsDrawer = stylin(Drawer)({
  '& .MuiDrawer-paper': {
    height: 'calc(100% - 135px)'
  }
})
