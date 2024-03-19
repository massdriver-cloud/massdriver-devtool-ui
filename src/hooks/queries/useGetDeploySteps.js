import useFetch from 'hooks/useFetch'

import ConnectionsStep from 'components/deploy-page/ConnectionsStep.container'
import SecretsStep from 'components/deploy-page/SecretsStep.container'
import ConfigureStep from 'components/deploy-page/ConfigureStep.container'


const CONNECTIONS_STEP = {
  id: 'connections',
  label: 'Set connections',
  component: ConnectionsStep,
  actions: { next: { initialState: { disabled: true } } }
}

const SECRETS_STEP = {
  id: 'secrets',
  label: 'Set secrets',
  component: SecretsStep,
  actions: { next: { initialState: { disabled: true } } }
}

const CONFIGURE_STEP = {
  id: 'configure',
  label: 'Configure bundle',
  component: ConfigureStep,
  actions: { next: { label: 'Submit', type: 'submit' } }
}

const useGetDeploySteps = () => {
  const { data, loading, error } = useFetch('http://127.0.0.1:8080/bundle/secrets')
  const { data: connectionsSchema, loading: connectionsSchemaLoading, error: connectionsSchemaError } = useFetch('http://127.0.0.1:8080/bundle-server/schema-connections.json')

  const filteredSteps = [
    ...(Object.keys(connectionsSchema?.properties || {})).length > 0 ? [CONNECTIONS_STEP] : [],
    ...(Object.keys(data || {}).length > 0 ? [SECRETS_STEP] : []),
    CONFIGURE_STEP
  ]

  return {
    data: filteredSteps,
    loading: loading || connectionsSchemaLoading,
    error: error || connectionsSchemaError
  }
}

export default useGetDeploySteps
