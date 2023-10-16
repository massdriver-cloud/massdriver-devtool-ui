import useGetBundleSecrets from './useGetBundleSecrets'
import useFetch from '../useFetch'

const useGetDeployWizardData = () => {
  const { data: secretsData, loading: secretsLoading, error: secretsError } = useGetBundleSecrets()

  const { data: connectionsData, loading: connectionsLoading, error: connectionsError } = useFetch('http://127.0.0.1:8080/schema-connections.json')

  const hasSecrets = secretsData ? secretsData?.secretFields?.length > 0 : undefined
  const hasConnections = connectionsData ? Object.keys(connectionsData?.properties || {}).length > 0 : undefined

  return {
    hasSecrets,
    hasConnections,
    loading: secretsLoading || connectionsLoading,
    error: secretsError || connectionsError
  }
}

export default useGetDeployWizardData
