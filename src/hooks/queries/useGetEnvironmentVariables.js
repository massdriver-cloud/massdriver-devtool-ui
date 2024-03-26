import { keyframes } from '@emotion/react'
import useFetch from 'hooks/useFetch'

const useGetEnvironmentVariables = () => {
  const { data, loading, error } = useFetch('http://127.0.0.1:8080/bundle/envs')

  const formattedData = data ? Object.keys(data || {}).map(key => ({
    name: key,
    value: data[key].value,
    error: data[key].error
  })) : undefined

  return {
    data: formattedData,
    loading,
    error
  }
}

export default useGetEnvironmentVariables
