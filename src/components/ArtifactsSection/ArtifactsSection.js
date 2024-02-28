import stylin from 'utils/stylin'

import Section from 'components/Section'
import LineItem from 'components/LineItem'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SECTION_TITLE = "Bundle artifacts"
const SECTION_DESCRIPTION = "Information regarding the bundles' produced artifacts (right package handles)."

const ArtifactsSection = ({
  loading,
  error,
  artifacts
}) => (
  <Section
    title={SECTION_TITLE}
    description={SECTION_DESCRIPTION}
  >
    <Container>
      {
        loading ? (
          <EmptyMessage>Loading...</EmptyMessage>
        ) : error ? (
          <EmptyMessage>Error: There was an issue parsing your artifacts data.</EmptyMessage>
        ) :
          artifacts ?
            artifacts.map(({ id, type, name }) => (
              <LineItem
                key={id}
                type={type}
                name={name}
              />
            )) : (
              <EmptyMessage>This bundle does not produce any artifacts...</EmptyMessage>
            )
      }
    </Container>
  </Section>
)

export default ArtifactsSection

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  p: '12px'
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
