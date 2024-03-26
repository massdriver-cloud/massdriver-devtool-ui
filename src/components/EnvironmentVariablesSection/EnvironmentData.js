import stylin from 'utils/stylin'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

const EnvironmentData = ({
  name,
  value,
  error
}) => {


  return (
    <Container>
      <Row justifyContent="space-between">
        <Header>{name}</Header>
        <Row gap="4px">
          {error ? (
            <CancelIcon
              sx={{
                color: 'error.main'
              }}
            />
          ) : (
            <CheckCircleIcon
              sx={{
                color: 'success.main'
              }}
            />
          )}
        </Row>
      </Row>
      <Row gap="6px">
        <Label error={error}>{error ? 'Error:' : 'Value:'}</Label>
        {error ? (
          <Error title={error}>{error}</Error>
        ) : (
          <Value title={value}>{value}</Value>
        )}
      </Row>
    </Container>
  )
}

export default EnvironmentData

const Container = stylin(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: '4px',
  p: '6px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}))

const Row = stylin(Box)({
  display: 'flex',
  alignItems: 'center'
})

const Header = stylin(Typography)(({ theme }) => ({
  color: '#000',
  fontSize: '12px'
}))

const Label = stylin(Typography, ['error'])(({ theme, error }) => ({
  ...(error ? { color: theme.palette.error.main } : {}),
  fontSize: '13px'
}))

const Error = stylin(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '12px'
}))

const Value = stylin('pre')(({ theme }) => ({
  color: theme.palette.grey['A700'],
  fontSize: '11px',
  padding: '3px 5px',
  background: '#D2DDF7',
  border: 'solid 1px #9AADD9',
  fontFamily: 'monospace',
  borderRadius: '3px',
  m: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  position: 'relative'
}))
