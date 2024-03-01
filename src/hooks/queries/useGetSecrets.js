import { useMemo } from 'react'
import useFetch from 'hooks/useFetch'

const formatSecrets = data => Object.keys(data || {}).reduce((acc, key) => [
  ...acc,
  {
    id: key,
    name: key,
    title: data[key].title,
    description: data[key].description,
    json: data[key].json,
    required: data[key].required
  }
], [])

const useGetSecrets = () => {
  const { data, loading, error } = useFetch('http://127.0.0.1:8080/bundle/secrets')
  const formattedData = useMemo(() => data ? formatSecrets(data) : undefined, [data])

  return {
    data: formattedData,
    loading,
    error
  }
}

export default useGetSecrets
