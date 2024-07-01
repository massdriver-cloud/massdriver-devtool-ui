import stylin from 'utils/stylin'

import AutoDecommissionBar from 'components/deploy-page/AutoDecommissionBar.container'
import ArtifactSection from 'components/deploy-page/ArtifactSection'
import ResourceProgressViewer from 'components/ResourceProgressViewer/ResourceProgressViewer'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer'

const SuccessInfo = ({
  isOpen,
  open,
  close,
  status,
  action,
  deploymentEvents,
  artifacts = []
}) => (
  <>
    <AutoDecommissionBar />
    <Container>
      <Header>
        <Title>Bundle successfully provisioned</Title>
        <Description>
          The bundle has been successfully provisioned. Check your <strong>cloud console</strong> or <strong>provisioning logs</strong> for confirmation.
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
        <ArtifactsContainer>
          <Header>
            <Title fontSize="16px">Artifacts</Title>
            <Description fontSize="12px">
              The artifacts produced by the bundle. In Massdriver, these would appear as the right package handles.
            </Description>
          </Header>
          {artifacts.length > 0 ? (
            <Artifacts container spacing='30px' alignItems="stretch">
              {artifacts.map(({ data, specs, metadata }, index) => (
                <Grid
                  item
                  key={metadata.field}
                  xs={12}
                  md={artifacts.length % 2 !== 0 && index === artifacts.length - 1 ? true : 6}
                >
                  <ArtifactSection
                    fieldName={metadata.field}
                    data={data}
                    specs={specs}
                    metadata={metadata}
                  />
                </Grid>
              ))}
            </Artifacts>
          ) : (
            <EmptyMessage>This bundle does not produce any artifacts...</EmptyMessage>
          )}
        </ArtifactsContainer>
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

export default SuccessInfo

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  px: '20px',
  pt: '10px',
  pb: '20px'
})

const Header = stylin(Box)({
  mb: '10px'
})

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[900],
  fontWeight: 'bold'
}))

const Title = stylin(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.grey[900],
  lineHeight: '20px'
}))

const Description = stylin(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[700]
}))

const Column = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  pt: '10px'
})

const Artifacts = stylin(Grid)({
  mt: '10px'
})

const ArtifactsContainer = stylin(Box)({
  mt: '10px'
})

const LogsDrawer = stylin(Drawer)({
  '& .MuiDrawer-paper': {
    height: 'calc(100% - 135px)'
  }
})
