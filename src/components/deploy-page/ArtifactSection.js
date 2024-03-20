import stylin from 'utils/stylin'

import Section from 'components/Section'
import CodeBlock from 'components/CodeBlock'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const ArtifactSection = ({
  fieldName,
  data,
  specs,
  metadata
}) => (
  <StyledSection title={fieldName}>
    <Container>
      <Column>
        <Label>Data</Label>
        <CodeBlock
          copy
          data={data}
          sx={{ fontSize: '10px' }}
        />
      </Column>
      <Column>
        <Label>Specs</Label>
        <CodeBlock
          copy
          data={specs}
          sx={{ fontSize: '10px' }}
        />
      </Column>
      <Column>
        <Label>Metadata</Label>
        <CodeBlock
          copy
          data={metadata}
          sx={{ fontSize: '10px' }}
        />
      </Column>
    </Container>
  </StyledSection>
)

export default ArtifactSection

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  p: '12px',
  pt: '6px',
})

const StyledSection = stylin(Section)({
  '.section-header': {
    py: '6px',
    px: '8px'
  },
  '.section-title': {
    fontSize: '14px'
  }
})

const Label = stylin(Typography)({
  fontSize: '14px',
  fontWeight: 500
})

const Column = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
})
