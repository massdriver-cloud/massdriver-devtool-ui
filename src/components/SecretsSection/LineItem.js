import stylin from 'utils/stylin'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

const LineItem = ({
  name,
  title,
  description,
  json,
  required
}) => (
  <Container>
    <Row justifyContent="space-between">
      <Text>{title ? `${title} | ${name}` : name}</Text>
      <Row gap="4px">
        <Chip
          label='JSON'
          size='small'
          color={json ? 'success' : 'error'}
        />
        <Chip
          label='Required'
          size='small'
          color={required ? 'success' : 'error'}
        />
      </Row>
    </Row>
    <Description>{description}</Description>
  </Container>
)

export default LineItem

const Container = stylin(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: '4px',
  p: '6px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minHeight: '68px'
}))

const Row = stylin(Box)({
  display: 'flex',
})

const Text = stylin(Typography)(({ theme }) => ({
  color: '#000',
  fontSize: '12px'
}))

const Description = stylin(Typography)(({ theme }) => ({
  color: theme.palette.grey['A700'],
  fontSize: '12px'
}))
