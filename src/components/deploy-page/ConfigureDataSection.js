import stylin from 'utils/stylin'

import Section from 'components/Section'
import CodeBlock from 'components/CodeBlock'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ConfigureDataSection = ({
  loading,
  error,
  params = {},
}) => (
  <StyledSection
    title='Configuration params'
    description={<>The params configured in a previous step. These are also saved to the <strong>_params.auto.tfvars.json</strong> file.</>}
  >
    <Container>
      {
        loading ? (
          <EmptyMessage>Loading...</EmptyMessage>
        ) : error ? (
          <EmptyMessage>Error: There was an issue parsing your bundle params.</EmptyMessage>
        ) : Object.keys(params).length > 0 ? (
          <CodeBlock
            copy
            data={params}
            sx={{ fontSize: '10px', height: '100%', 'pre': { height: '100%' } }}
          />
        ) : (
          <EmptyMessage>You have not configured any params...</EmptyMessage>
        )
      }
    </Container>
  </StyledSection>
)

export default ConfigureDataSection

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
  gap: '10px',
  height: 'calc(100% - 48px)'
})

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '10px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
}))
