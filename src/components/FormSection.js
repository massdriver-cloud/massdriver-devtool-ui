import stylin from '../utils/stylin'
import Form from './Form'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const FormSection = ({
  schema,
  uiSchema,
  formData,
  onSubmit,
  onChange,
  formContext
}) => schema && uiSchema ? (
  <Container>
    <StyledForm
      key="form"
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onSubmit={onSubmit}
      onChange={onChange}
      formContext={formContext}
    >
      <Button
        variant="contained"
        type="submit"
      >
        Validate
      </Button>
    </StyledForm>
  </Container>
) : null

export default FormSection

const StyledForm = stylin(Form)({
  '.MuiCheckbox-colorSecondary.Mui-checked': {
    color: '#3c3c3c'
  }
})

const Container = stylin(Box)({
  px: '10%',
  py: '20px',
  backgroundColor: 'white'
})
