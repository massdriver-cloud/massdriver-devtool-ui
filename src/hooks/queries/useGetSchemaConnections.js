import { useMemo } from 'react'
import useFetch from 'hooks/useFetch'
import {
  CLOUD_ARTIFACT_TYPE_AWS,
  CLOUD_ARTIFACT_TYPE_AZURE,
  CLOUD_ARTIFACT_TYPE_GCP,
  CLOUD_ARTIFACT_TYPE_KUBERNETES
} from 'constants/cloud'

const CLOUD_ARTIFACT_TYPES = [CLOUD_ARTIFACT_TYPE_AWS, CLOUD_ARTIFACT_TYPE_AZURE, CLOUD_ARTIFACT_TYPE_GCP, CLOUD_ARTIFACT_TYPE_KUBERNETES]

const getTypeFromId = id => id ? id.split('/').slice(id.split('/').length - 2).join('/') : ''

const formatConnections = properties => {
  // Formats all connections into an array with the proper values
  const connections = Object.keys(properties || {}).reduce((acc, key) => {
    const property = properties[key]
    const type = getTypeFromId(property?.$id)

    return [
      ...acc,
      {
        id: key,
        type,
        name: key,
        cloud: property?.$md?.cloud?.id || type?.split('/')?.[1]?.split('-')?.[0]
      }
    ]
  }, [])

  return {
    credentialConnections: connections.filter(connection => CLOUD_ARTIFACT_TYPES.includes(connection.type)),
    normalConnections: connections.filter(connection => !CLOUD_ARTIFACT_TYPES.includes(connection.type))
  }
}

const useGetSchemaConnections = () => {
  const { data, loading, error } = useFetch('http://127.0.0.1:8080/bundle-server/schema-connections.json')


  const formattedData = useMemo(() => data ? formatConnections(data.properties) : undefined, [data])

  return {
    data: formattedData,
    loading,
    error
  }
}

export default useGetSchemaConnections
