import { useMemo } from 'react'
import useFetch from 'hooks/useFetch'

const getTypeFromId = id => id ? id.split('/').slice(id.split('/').length - 2).join('/') : ''

const formatArtifacts = properties => Object.keys(properties || {}).reduce((acc, key) => {
  const property = properties[key]
  const type = getTypeFromId(property?.$id)

  return [
    ...acc,
    {
      id: key,
      type,
      name: key
    }
  ]
}, [])

const useGetSchemaArtifacts = () => {
  const { data, loading, error } = useFetch('http://127.0.0.1:8080/bundle-server/schema-artifacts.json')


  const formattedData = useMemo(() => data ? formatArtifacts(data.properties) : undefined, [data])

  return {
    data: formattedData,
    loading,
    error
  }
}

export default useGetSchemaArtifacts
