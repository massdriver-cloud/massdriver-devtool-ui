import stylin from 'utils/stylin'

import Section from 'components/Section'
import LineItem from 'components/SecretsSection/LineItem'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SECTION_TITLE = "Bundle secrets"

const SecretsSection = ({
  loading,
  error,
  secrets
}) => (
  <Section
    title={SECTION_TITLE}
    description={<> A list of the bundle's secrets outlined in the <strong>massdriver.yaml</strong>. In the UI, these will be found under the <strong>secrets</strong> tab in the package drawer. </>}
  >
    <Container>
      {
        loading ? (
          <EmptyMessage>Loading...</EmptyMessage>
        ) : error ? (
          <EmptyMessage>Error: There was an issue parsing your secrets data.</EmptyMessage>
        ) :
          secrets ?
            secrets.map(({ id, name, title, description, json, required }) => (
              <LineItem
                key={id}
                name={name}
                title={title}
                description={description}
                json={json}
                required={required}
              />
            )) : (
              <EmptyMessage>This bundle does not have any secrets...</EmptyMessage>
            )
      }
    </Container>
  </Section>
)

export default SecretsSection

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  p: '12px'
})

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '10px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
}))
