import { useMemo } from 'react'
import useFetch from '../useFetch'

const getTypeFromId = id => id ? id.split('/').slice(id.split('/').length - 2).join('/') : ''

const useGetConnectionsData = () => {
  const { data: currentlySetConnectionsData, loading: currentlySetConnectionsLoading, error: currentlySetConnectionsError } = useFetch('http://127.0.0.1:8080/bundle/connections')

  const { data, loading, error } = useFetch('http://127.0.0.1:8080/bundle-server/schema-connections.json')

  const connectionTypesMap = useMemo(() => Object.keys(data?.properties || {}).reduce((acc, key) => ({ ...acc, [getTypeFromId(data?.properties?.[key]?.$id)]: key }), {}), [data, currentlySetConnectionsData])

  const connectionTypes = useMemo(() => Object.keys(connectionTypesMap), [data, currentlySetConnectionsData])

  const currentlySetConnections = useMemo(() => Object.keys(currentlySetConnectionsData || {}).reduce((acc, key) => ({ ...acc, [Object.keys(connectionTypesMap).find(type => connectionTypesMap[type] === key)]: currentlySetConnectionsData[key] }), {}), [data, currentlySetConnectionsData])

  const hasConnectionSetMap = useMemo(() => Object.keys(currentlySetConnections || {}).reduce((acc, key) => ({ ...acc, [key]: !JSON.stringify(currentlySetConnections[key]).match('"REPLACE ME"') }), {}), [data, currentlySetConnectionsData])

  return {
    connectionTypesMap,
    connectionTypes,
    currentlySetConnections,
    hasConnectionSetMap,
    loading: currentlySetConnectionsLoading || loading,
    error: currentlySetConnectionsError || error
  }
}

export default useGetConnectionsData
