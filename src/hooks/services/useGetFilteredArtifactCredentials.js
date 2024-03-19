import { useAuth } from 'contexts/authContext'
import useFetch from 'hooks/useFetch'
import { GQL_API_ENDPOINT } from 'constants/api'
import { formatErrors } from 'hooks/services/helpers'
import { isTruthyString } from 'utils/string'

const GET_FILTERED_ARTIFACTS_QUERY = `
  query filterArtifactsByType($type: String!, $organizationId: ID!) {
    filterArtifactsByType(type: $type, organizationId: $organizationId) {
      id
      name
    }
  }
`

const useGetFilteredArtifactCredentials = ({ type }) => {
  const { organizationId, serviceAccountId } = useAuth()

  const { data, loading, error } = useFetch(GQL_API_ENDPOINT, {
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + serviceAccountId
      },
      method: 'POST',
      body: JSON.stringify({
        query: GET_FILTERED_ARTIFACTS_QUERY,
        variables: {
          organizationId,
          ...(type ? {
            type
          } : {})
        }
      })
    },
    skip: !isTruthyString(type)
  })

  return {
    data: data?.data?.filterArtifactsByType,
    loading,
    error: formatErrors(data, error)
  }
}

export default useGetFilteredArtifactCredentials
