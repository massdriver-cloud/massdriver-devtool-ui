import stylin from 'utils/stylin'

import Section from 'components/Section'
import LineItem from 'components/LineItem'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SECTION_TITLE = "Bundle connections"
const SECTION_DESCRIPTION = "Information regarding the bundles' dependent connections (left package handles)."

const CREDENTIALS_TITLE = 'Cloud credentials'
const CREDENTIALS_DESCRIPTION = 'The cloud credentials that will be used to deploy the bundle. In the app, these will be fulfilled by the environment-wide "Cloud Credentials."'

const CONNECTIONS_TITLE = 'Normal connections'
const CONNECTIONS_DESCRIPTION = "These are the bundles' normal dependent connections. In the app, these will appear as the left handles on the package."

const ConnectionsSection = ({
  loading,
  error,
  credentialConnections,
  normalConnections,
}) => (
  <Section
    title={SECTION_TITLE}
    description={SECTION_DESCRIPTION}
  >
    <Container>
      {loading ? (
        <EmptyMessage>Loading...</EmptyMessage>
      ) : error ? (
        <EmptyMessage>Error: There was an issue parsing your connection data.</EmptyMessage>
      ) : (
        <>
          <Column>
            <Header>
              <Title>{CREDENTIALS_TITLE}</Title>
              <Description>{CREDENTIALS_DESCRIPTION}</Description>
            </Header>
            {credentialConnections ?
              credentialConnections.map(({ id, type, name, cloud }) => (
                <LineItem
                  key={id}
                  type={type}
                  name={name}
                  cloud={cloud}
                />
              )) : (
                <EmptyMessage>This bundle does not require credential connections...</EmptyMessage>
              )}
          </Column>
          <Column>
            <Header>
              <Title>{CONNECTIONS_TITLE}</Title>
              <Description>{CONNECTIONS_DESCRIPTION}</Description>
            </Header>
            {normalConnections ?
              normalConnections.map(({ id, type, name }) => (
                <LineItem
                  key={id}
                  type={type}
                  name={name}
                />
              )) : (
                <EmptyMessage>This bundle does not require normal connections...</EmptyMessage>
              )}
          </Column>
        </>
      )}
    </Container>
  </Section>
)

export default ConnectionsSection

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  p: '12px'
})
const Column = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

const Header = stylin(Box)({

})

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '10px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
}))

const Title = stylin(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[900]
}))

const Description = stylin(Typography)(({ theme }) => ({
  fontSize: '10px',
  color: theme.palette.grey[700]
}))
