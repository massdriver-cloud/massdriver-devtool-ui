import stylin from 'utils/stylin'

import Section from 'components/Section'
import EnvironmentData from 'components/EnvironmentVariablesSection/EnvironmentData'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const EnvironmentVariablesSection = ({
  loading,
  error,
  envs = []
}) => (
  <StyledSection
    title='Envrionment Variables'
    description={<>The environment variables configured in the <strong>massdriver.yaml</strong>. These will pull values from your previously configured <strong>connections</strong> & <strong>params</strong>.</>}
  >
    <Container>
      {
        loading ? (
          <EmptyMessage>Loading...</EmptyMessage>
        ) : error ? (
          <EmptyMessage>Error: There was an issue parsing your bundle envs.</EmptyMessage>
        ) :
          envs.length > 0 ? (
            envs.map(({ name, value, error }) => (
              <EnvironmentData
                key={name}
                name={name}
                value={value}
                error={error}
              />
            ))
          ) : (
            <EmptyMessage>This bundle does not have any envs...</EmptyMessage>
          )
      }
    </Container>
  </StyledSection>
)

export default EnvironmentVariablesSection

const StyledSection = stylin(Section)({
  height: '100%',
  '.section-header': {
    pt: '6px',
    pb: '8px',
    px: '8px'
  },
  '.section-title': {
    fontSize: '14px'
  }
})

const Container = stylin(Box)({
  p: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
})

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '10px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
}))
