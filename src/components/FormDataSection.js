import stylin from '../utils/stylin'

import Box from '@mui/material/Box'


const FormDataSection = ({ formData }) => (
  <Container>
    <JSONBlock>
      {JSON.stringify(formData, null, 2)}
    </JSONBlock>
  </Container>
)

export default FormDataSection

const JSONBlock = stylin('pre')({
  padding: '3px 5px',
  background: '#D2DDF7',
  border: 'solid 1px #9AADD9',
  fontFamily: 'monospace',
  borderRadius: '3px',
  width: '100%'
})

const Container = stylin(Box)({
  px: '10%',
  py: '20px',
  backgroundColor: 'white',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
})
