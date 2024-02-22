import useFetch from '../useFetch'

const useGetDeployWizardData = () => {
  const { data: schema, loading: schemaLoading, error: schemaError } = useFetch('http://127.0.0.1:8080/bundle-server/schema-params.json')
  const { data: uiSchema, loading: uiSchemaLoading, error: uiSchemaError } = useFetch('http://127.0.0.1:8080/bundle-server/schema-ui.json')

  return {
    schema,
    uiSchema,
    loading: schemaLoading || uiSchemaLoading,
    error: schemaError || uiSchemaError
  }
}

export default useGetDeployWizardData
