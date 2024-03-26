import stylin from 'utils/stylin'

import ConnectionsDataSection from 'components/deploy-page/ConnectionsDataSection.container'
import ConfigureDataSection from 'components/deploy-page/ConfigureDataSection.container'
import EnvironmentVariablesSection from 'components/EnvironmentVariablesSection/EnvironmentVariablesSection.container'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const ReviewStep = ({
  loading,
  error,
  onNext,
  children
}) => (
  <Container>
    <Header>
      <Title>Review deployment data</Title>
      <Description>
        Review all of the information before starting deployment.
      </Description>
    </Header>
    {
      loading ? (
        <EmptyMessage>Loading...</EmptyMessage>
      ) : error ? (
        <EmptyMessage>Error: There was an issue parsing your configuration data.</EmptyMessage>
      ) : (
        <Grid container spacing='30px' alignItems="stretch">
          <Grid
            item
            xs={12}
            md={6}
          >
            <EnvironmentVariablesSection />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <ConnectionsDataSection />
          </Grid>
          <Grid
            item
            xs={12}
            md={true}
          >
            <ConfigureDataSection />
          </Grid>
        </Grid>
      )
    }
    {children({ back: () => ({ successful: true, data: formData }), next: onNext })}
  </Container>
)

export default ReviewStep

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  pt: '6px',
})

const Header = stylin(Box)({

})

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
}))

const Title = stylin(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.grey[900]
}))

const Description = stylin(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.grey[700]
}))
