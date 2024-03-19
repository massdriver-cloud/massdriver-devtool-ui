import { useAuth } from 'contexts/authContext'
import useFetch from 'hooks/useFetch'
import { GQL_API_ENDPOINT } from 'constants/api'
import { formatErrors } from 'hooks/services/helpers'

const GET_ARTIFACT_DEFINITIONS_QUERY = `
  query getArtifactDefinitions(
    $input: ArtifactDefinitionInput
    $organizationId: ID!
  ) {
    artifactDefinitions(input: $input, organizationId: $organizationId) {
      id
      name
      schema
      type
      url
      fqn
    }
  }
`

const useGetArtifactDefinitions = ({ filter }) => {
  const { organizationId, serviceAccountId } = useAuth()

  const { data, loading, error } = useFetch(GQL_API_ENDPOINT, {
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + serviceAccountId
      },
      method: 'POST',
      body: JSON.stringify({
        query: GET_ARTIFACT_DEFINITIONS_QUERY,
        variables: {
          organizationId,
          ...(filter ? {
            input: {
              filter
            }
          } : {})
        }
      })
    }
  })

  return {
    data: data?.data?.artifactDefinitions,
    loading,
    error: formatErrors(data, error)
  }
}

export default useGetArtifactDefinitions
