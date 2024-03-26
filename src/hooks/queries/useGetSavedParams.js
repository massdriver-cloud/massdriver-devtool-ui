import useFetch from 'hooks/useFetch'

const useGetSavedParams = () => {
  const { data, loading, error } = useFetch('http://127.0.0.1:8080/bundle/params')

  return {
    data,
    loading,
    error
  }
}

export default useGetSavedParams
