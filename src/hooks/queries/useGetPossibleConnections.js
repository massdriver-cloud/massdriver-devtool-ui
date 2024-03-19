import { useMemo } from 'react'
import useFetch from '../useFetch'

// Gets the type from the $id on the artifact definition. 
const getTypeFromId = id => id ? id.split('/').slice(id.split('/').length - 2).join('/') : ''

// Checks if section of file is an object and if it has "REPLACE ME" anywhere.
const isConnectionSet = connection => typeof connection === 'object' && !JSON.stringify(connection).match('"REPLACE ME"')

const CREDENTIALS = ['massdriver/aws-iam-role', 'massdriver/azure-service-principal', 'massdriver/gcp-service-account', 'massdriver/kubernetes-cluster']

const useGetPossibleConnections = () => {
  const { data: currentConnections, loading: currentConnectionsLoading, error: currentConnectionsError } = useFetch('http://127.0.0.1:8080/bundle/connections')

  const { data, loading, error } = useFetch('http://127.0.0.1:8080/bundle-server/schema-connections.json')

  const possibleConnections = useMemo(() => Object.keys(data?.properties || {}).reduce((acc, key) => {
    const type = getTypeFromId(data?.properties?.[key]?.$id)

    return {
      ...acc,
      ...(CREDENTIALS.includes(type) ? {
        credentials: [
          ...acc?.credentials || [],
          {
            id: key,
            type,
            required: data?.required?.includes(key),
            isSet: isConnectionSet(currentConnections?.[key])
          }
        ]
      } : {
        normal: [
          ...acc?.normal || [],
          {
            id: key,
            type,
            required: data?.required?.includes(key),
            isSet: isConnectionSet(currentConnections?.[key])
          }
        ]
      })
    }
  }, {}), [data, currentConnections])

  return {
    data: data ? {
      possibleConnections,
      currentConnections
    } : undefined,
    loading: loading || currentConnectionsLoading,
    error: error || currentConnectionsError
  }
}

export default useGetPossibleConnections
