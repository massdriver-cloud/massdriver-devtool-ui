import stylin from 'utils/stylin'

import Section from 'components/Section'
import CodeBlock from 'components/CodeBlock'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ConnectionsDataSection = ({
  loading,
  error,
  credentials = [],
  normal = []
}) => (
  <StyledSection
    title='Connections'
    description={<>The connections configured in a previous step. These are also saved to the <strong>_connections.auto.tfvars.json</strong> file.</>}
  >
    <Container>
      {
        loading ? (
          <EmptyMessage>Loading...</EmptyMessage>
        ) : error ? (
          <EmptyMessage>Error: There was an issue parsing your bundle connections.</EmptyMessage>
        ) : (
          <Column>
            <Column gap='10px'>
              <Header>
                <Title>Cloud credentials</Title>
                <Description>
                  The values for your selected credential connections.
                </Description>
              </Header>
              {
                credentials.length > 0 ?
                  credentials.map(({ id, type, name, data }) => (
                    <Column gap="4px" key={id}>
                      <Typography fontWeight={500} fontSize="12px">{`${name} (${type})`}</Typography>
                      <CodeBlock
                        copy
                        data={data}
                        sx={{ fontSize: '10px' }}
                      />
                    </Column>
                  )) : (
                    <EmptyMessage>You have not configured any credential connections...</EmptyMessage>
                  )}
            </Column>
            <Column gap='10px'>
              <Header>
                <Title>Normal connections</Title>
                <Description>
                  The values for your selected normal connections.
                </Description>
              </Header>
              {normal.length > 0 ? normal.map(({ id, type, name, data }) => (
                <Column gap="4px" key={id}>
                  <Typography fontWeight={500} fontSize="12px">{`${name} (${type})`}</Typography>
                  <CodeBlock
                    copy
                    data={data}
                    sx={{ fontSize: '10px' }}
                  />
                </Column>
              )) : (
                <EmptyMessage>You have not configured any normal connections...</EmptyMessage>
              )}
            </Column>
          </Column>
        )
      }
    </Container>
  </StyledSection>
)

export default ConnectionsDataSection

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

const Column = stylin(Box, ['gap'])(({ gap }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: gap || '20px',
}))


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

const Header = stylin(Box)({

})

const Title = stylin(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[900]
}))

const Description = stylin(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.grey[700]
}))
