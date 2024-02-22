import useFetch from '../useFetch'


const useGetBundleSecrets = () => {
  const { data, loading, error } = useFetch('http://127.0.0.1:8080/bundle/secrets')
  const { data: schema, loading: schemaLoading, error: schemaError } = useFetch('http://127.0.0.1:8080/bundle-server/schema-params.json')

  return {
    data: (data && schema) ? {
      bundleName: schema?.title,
      secretFields: Object.keys(data).reduce((prev, cur) => [
        ...prev,
        {
          ...data?.[cur],
          name: cur
        }
      ], [])
    } : undefined,
    loading: loading || schemaLoading,
    error: error || schemaError
  }
}

export default useGetBundleSecrets
