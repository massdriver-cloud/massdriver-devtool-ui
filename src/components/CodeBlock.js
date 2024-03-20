import stylin from 'utils/stylin'
import CopyButton from 'components/CopyButton'

import Box from '@mui/material/Box'


const CodeBlock = ({ data, sx, copy, className }) => (
  <Container sx={sx} className={className}>
    <JSONBlock title={JSON.stringify(data, null, 2)}>
      {JSON.stringify(data, null, 2)}
      {copy && (<StyledCopyButton itemToCopy={data} />)}
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
  m: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  position: 'relative'
})

const Container = stylin(Box)({
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
})

const StyledCopyButton = stylin(CopyButton)({
  'svg': {
    width: '15px',
    height: '15px'
  },
  position: 'absolute',
  top: '0px',
  right: '0px',
  zIndex: 10
})
