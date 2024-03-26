import useGetSavedParams from 'hooks/queries/useGetSavedParams'
import useGetFormSchemas from 'hooks/queries/useGetFormSchemas'

const useGetConfigureStepData = () => {
  const { data, loading, error } = useGetSavedParams()
  const { schema, uiSchema, loading: schemasLoading, error: schemasError } = useGetFormSchemas()


  return {
    schema,
    uiSchema,
    initialFormData: data,
    loading: loading || schemasLoading,
    error: error || schemasError
  }
}

export default useGetConfigureStepData
