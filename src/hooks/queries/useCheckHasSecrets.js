import useFetch from 'hooks/useFetch'

const useCheckHasSecrets = () => {
  const { data, loading, error } = useFetch('http://127.0.0.1:8080/bundle/secrets')

  const hasSecrets = data ? Object.keys(data || {}).length > 0 : undefined

  return {
    hasSecrets,
    loading,
    error
  }
}

export default useCheckHasSecrets
