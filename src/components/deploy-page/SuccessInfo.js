import stylin from 'utils/stylin'

import AutoDecommissionBar from 'components/deploy-page/AutoDecommissionBar.container'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SuccessInfo = ({
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
          <Title>Bundle successfully provisioned</Title>
          <Description>
            The bundle has been successfully provisioned. Check your <strong>cloud console</strong> or <strong>container logs</strong> for confirmation.
          </Description>
        </Header>
        <Column>
          <InfoCard>
            <Label>Container Name</Label>
            <Value>{containerName}</Value>
          </InfoCard>
          <InfoCard>
            <Label>Container ID</Label>
            <Value>{containerId}</Value>
          </InfoCard>
        </Column>
      </Container>
    </>
  )

export default SuccessInfo

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
  pl: '10px',
  color: theme.palette.grey['A700']
}))
