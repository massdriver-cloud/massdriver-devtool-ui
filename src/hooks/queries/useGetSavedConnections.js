import { useMemo } from 'react'
import useFetch from 'hooks/useFetch'
import useGetSchemaConnections from 'hooks/queries/useGetSchemaConnections'

const getFormattedData = (data, schemaConnections) => (data && schemaConnections) ? ({
  credentials: schemaConnections?.credentialConnections?.map(credentialConnection => ({
    ...credentialConnection,
    data: data[credentialConnection.id]
  })),
  normal: schemaConnections?.normalConnections?.map(normalConnection => ({
    ...normalConnection,
    data: data[normalConnection.id]
  })),

}) : undefined

const useGetSavedParams = () => {
  const { data, loading, error } = useFetch('http://127.0.0.1:8080/bundle/connections')
  const { data: schemaConnections, loading: schemaLoading, error: schemaError } = useGetSchemaConnections()

  const formattedData = useMemo(() => getFormattedData(data, schemaConnections), [data, schemaConnections])

  return {
    data: formattedData,
    loading: loading || schemaLoading,
    error: error || schemaError
  }
}

export default useGetSavedParams
