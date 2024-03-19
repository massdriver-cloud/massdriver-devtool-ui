import stylin from 'utils/stylin'

import AutoDecommissionBar from 'components/deploy-page/AutoDecommissionBar.container'
import CopyButton from 'components/CopyButton'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const FailInfo = ({
  loading,
  error,
  containerName,
  containerId,
}) => loading ? (
  <EmptyMessage>Loading...</EmptyMessage>
) : error ? (
  <EmptyMessage>Error: There was an issue parsing your container info.</EmptyMessage>
) : (
    <>
      <AutoDecommissionBar />
      <Container>
        <Header>
          <Title>Bundle provisioning failed</Title>
          <Description>
            There was an issue when provisioning your bundle. Check your <strong>container logs</strong> for more information.
          </Description>
        </Header>
        <Column>
          <InfoCard>
            <Label>Container Name</Label>
            <ValueRow>
              <Value title={containerName}>{containerName}</Value>
              <StyledCopyButton itemToCopy={containerName} />
            </ValueRow>
          </InfoCard>
          <InfoCard>
            <Label>Container ID</Label>
            <ValueRow>
              <Value title={containerId}>{containerId}</Value>
              <StyledCopyButton itemToCopy={containerId} />
            </ValueRow>
          </InfoCard>
        </Column>
      </Container>
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

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
}))

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

const InfoCard = stylin(Box)(({ theme }) => ({
  borderRadius: '4px',
  border: `1px solid ${theme.palette.grey[300]}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  p: '6px',
  px: '8px'
}))

const Label = stylin(Typography)({
  fontSize: '14px',
})

const Value = stylin(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.grey['A700'],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}))

const ValueRow = stylin(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  pl: '10px',
})

const StyledCopyButton = stylin(CopyButton)({
  'svg': {
    width: '15px',
    height: '15px'
  }
})
