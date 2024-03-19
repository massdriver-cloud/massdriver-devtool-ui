import useFetch from 'hooks/useFetch'
import { useMemo } from 'react'

const useGetSchemaConnections = ({ containerId }) => {
  const { data, loading, error } = useFetch('http://127.0.0.1:8080/containers/list?all=true&limit=0&name=mass', { skip: !containerId })

  const container = useMemo(() => data?.find(data => data.Id === containerId), [containerId, data])

  return {
    data: container ? {
      id: container?.Id,
      name: container?.Names?.[0]
    } : {},
    loading,
    error
  }
}

export default useGetSchemaConnections
