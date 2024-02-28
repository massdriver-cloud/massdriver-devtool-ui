import stylin from 'utils/stylin'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const LineItem = ({
  name,
  type
}) => (
  <Container
    direction="row"
    spacing='8px'
    divider={
      <Divider />
    }
  >
    <Text>
      {`Name:  ${name}`}
    </Text>
    <Text>
      {`Type:  ${type}`}
    </Text>
  </Container>
)

export default LineItem

const Container = stylin(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: '4px',
  p: '6px',
  alignItems: 'center'
}))

const Text = stylin(Typography)(({ theme }) => ({
  color: theme.palette.grey[900],
  fontSize: '12px'
}))

const Divider = stylin(Box)(({ theme }) => ({
  height: '15px',
  width: '1px',
  borderRadius: '6px',
  backgroundColor: theme.palette.grey[400]
}))
