import stylin from 'utils/stylin'

import Box from '@mui/material/Box'


const CodeBlock = ({ data, sx, className }) => (
  <Container sx={sx} className={className}>
    <JSONBlock>
      {JSON.stringify(data, null, 2)}
    </JSONBlock>
  </Container>
)

export default CodeBlock

const JSONBlock = stylin('pre')({
  padding: '3px 5px',
  background: '#D2DDF7',
  border: 'solid 1px #9AADD9',
  fontFamily: 'monospace',
  borderRadius: '3px',
  width: '100%',
  m: 0
})

const Container = stylin(Box)({
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
})
