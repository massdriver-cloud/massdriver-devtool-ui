import Form from 'components/Form'
import stylin from 'utils/stylin'
import PropTypes from 'prop-types'

import LoadingButton from '@mui/lab/LoadingButton'
import Tooltip from '@mui/material/Tooltip'

export const ConfigureManifestForm = ({
  schema,
  formData,
  onSubmit,
  uiSchema,
  onChange,
  formContext,
  children
}) =>
  schema && formData ? (
    <StyledForm
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onSubmit={onSubmit}
      onChange={onChange}
      formContext={formContext}
    >
      {children}
    </StyledForm>
  ) : (
    <div>Loading</div>
  )

ConfigureManifestForm.propTypes = {
  schema: PropTypes.object,
  uiSchema: PropTypes.object,
  formData: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
}

export default ConfigureManifestForm

const StyledForm = stylin(Form)({
  button: {
    border: '1px solid darkgray',
    margin: 0,
    marginRight: '1rem',
    backgroundColor: 'white',
    ':hover': {
      color: '#3c3c3c !important'
    }
  },

  '.MuiCheckbox-colorSecondary.Mui-checked': {
    color: '#3c3c3c'
  },

  '.MuiButton-label': {
    color: '#3c3c3c',

    '* > *': {
      color: '#3c3c3c'
    }
  }
})
