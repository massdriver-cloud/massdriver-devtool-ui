import stylin from 'utils/stylin'

import AutoDecommissionBar from 'components/deploy-page/AutoDecommissionBar.container'
import ArtifactSection from 'components/deploy-page/ArtifactSection'
import CopyButton from 'components/CopyButton'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const SuccessInfo = ({
  loading,
  error,
  containerName,
  containerId,
  artifacts = []
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
          <ArtifactsContainer>
            <Header>
              <Title fontSize="16px">Artifacts</Title>
              <Description fontSize="12px">
                The artifacts produced by the bundle. In Massdriver, these would appear as the right package handles.
              </Description>
            </Header>
            <Artifacts container spacing='30px' alignItems="stretch" zeroMinWidth>
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
          </ArtifactsContainer>
        </Column>
      </Container>
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

})

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
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

const Artifacts = stylin(Grid)({
  mt: '10px'
})

const ArtifactsContainer = stylin(Box)({
  mt: '10px'
})
