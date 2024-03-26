import { useMemo } from 'react'
import useFetch from 'hooks/useFetch'
import useCheckHasSecrets from 'hooks/queries/useCheckHasSecrets'

import ConnectionsStep from 'components/deploy-page/ConnectionsStep.container'
import ConfigureStep from 'components/deploy-page/ConfigureStep.container'
import ReviewStep from 'components/deploy-page/ReviewStep.container'
import SecretsStep from 'components/deploy-page/SecretsStep.container'


const CONNECTIONS_STEP = {
  id: 'connections',
  label: 'Set connections',
  component: ConnectionsStep,
  actions: { next: { initialState: { disabled: true } } }
}

const CONFIGURE_STEP = {
  id: 'configure',
  label: 'Configure bundle',
  component: ConfigureStep,
  actions: { next: { type: 'submit' } }
}

const REVIEW_STEP = {
  id: 'review',
  label: 'Review',
  component: ReviewStep,
}

const getSteps = (hasConnections, hasSecrets) => [
  // Connections Step
  ...(hasConnections ? [CONNECTIONS_STEP] : []),
  // Configure Step
  CONFIGURE_STEP,
  // Review Step
  {
    ...REVIEW_STEP,
    ...(hasSecrets ? {} : { actions: { next: { label: 'Deploy' } } }),
  },
  // Secrets Step
  ...(hasSecrets ? [SECRETS_STEP] : []),
]

const SECRETS_STEP = {
  id: 'secrets',
  label: 'Set secrets',
  component: SecretsStep,
  actions: { next: { initialState: { disabled: true }, label: 'Deploy' } }
}

const useGetDeploySteps = () => {
  const { hasSecrets, loading, error } = useCheckHasSecrets()
  const { data: connectionsSchema, loading: connectionsSchemaLoading, error: connectionsSchemaError } = useFetch('http://127.0.0.1:8080/bundle-server/schema-connections.json')

  const hasConnections = Object.keys(connectionsSchema?.properties || {}).length > 0

  const filteredSteps = useMemo(() => getSteps(hasConnections, hasSecrets), [hasSecrets, connectionsSchema])

  return {
    data: filteredSteps,
    loading: loading || connectionsSchemaLoading,
    error: error || connectionsSchemaError
  }
}

export default useGetDeploySteps
