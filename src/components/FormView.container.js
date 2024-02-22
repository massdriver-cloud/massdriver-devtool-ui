import { useState } from 'react'
import FormView from './FormView'
import useFetch from '../hooks/useFetch'
import { useSnackbar } from 'notistack'

const EnhancedFormView = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [formData, setFormData] = useState({})

  const { data: schema, loading: schemaLoading, error: schemaError } = useFetch('http://127.0.0.1:8080/bundle-server/schema-params.json')
  const { data: uiSchema, loading: uiSchemaLoading, error: uiSchemaError } = useFetch('http://127.0.0.1:8080/bundle-server/schema-ui.json')

  const onChange = ({ formData: newFormData }) =>
    setFormData({
      ...formData,
      ...(newFormData || {})
    })

  const onSubmit = ({ }) => enqueueSnackbar("Input passed form validation.", {
    variant: 'success',
    preventDuplicate: true,
    autoHideDuration: 5000,
    disableWindowBlurListener: true
  })

  return (
    <FormView
      loading={schemaLoading || uiSchemaLoading}
      error={schemaError || uiSchemaError}
      onChange={onChange}
      onSubmit={onSubmit}
      setFormData={setFormData}
      formData={formData}
      schema={schema}
      uiSchema={uiSchema}
    />
  )
}

export default EnhancedFormView
