import { useAuth } from '../../contexts/authContext'
import useFetch from '../useFetch'
import { GQL_API_ENDPOINT } from '../../constants/api'
import { formatErrors } from './helpers'

const GET_SUPPORTED_CLOUD_LOCATIONS = `
  query getSupportedLocations($organizationId: ID!, $cloudService: String!) {
    supportedLocations(
      organizationId: $organizationId
      cloudService: $cloudService
    ) {
      locations
    }
  }
`

const useGetSupportedCloudLocations = ({ cloudService }) => {
  const { organizationId, serviceAccountId } = useAuth()

  const { data, loading, error } = useFetch(GQL_API_ENDPOINT, {
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + serviceAccountId
      },
      method: 'POST',
      body: JSON.stringify({
        query: GET_SUPPORTED_CLOUD_LOCATIONS,
        variables: {
          organizationId: organizationId,
          cloudService,
        }
      })
    }
  })

  return {
    data: data?.data?.supportedLocations?.locations,
    loading,
    error: formatErrors(data, error)
  }
}

export default useGetSupportedCloudLocations
