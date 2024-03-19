import { useAuth } from 'contexts/authContext'
import useFetch from 'hooks/useFetch'
import { GQL_API_ENDPOINT } from 'constants/api'
import { formatErrors } from 'hooks/services/helpers'

const GET_CREDENTIALS_QUERY = `
  query getCredentials($input: ArtifactsInput, $organizationId: ID!) {
    artifacts(organizationId: $organizationId, input: $input) {
      items {
        name
        id
        type
        deletable {
          result
        }
        createdAt
      }
    }
  }
`

const useGetCredentials = () => {
  const { organizationId, serviceAccountId } = useAuth()

  const { data, loading, error } = useFetch(GQL_API_ENDPOINT, {
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + serviceAccountId
      },
      method: 'POST',
      body: JSON.stringify({
        query: GET_CREDENTIALS_QUERY,
        variables: {
          organizationId,
          input: { filter: { credential: true } },
        }
      })
    }
  })

  return {
    data: data?.data?.artifacts?.items,
    loading,
    error: formatErrors(data, error)
  }
}

export default useGetCredentials
