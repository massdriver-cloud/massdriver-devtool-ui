import { useAuth } from '../../contexts/authContext'
import useFetch from '../useFetch'
import { GQL_API_ENDPOINT } from '../../constants/api'
import { formatErrors } from './helpers'

const GET_DNS_ZONES = `
    query dnsZones($organizationId: ID!, $input: DnsZoneInput) {
      dnsZones(organizationId: $organizationId, input: $input) {
        id
        location
        name
        cloud
        cloudProviderId
      }
    }
  `

const useGetDnsZones = ({ cloud }) => {
  const { organizationId, serviceAccountId } = useAuth()

  const { data, loading, error } = useFetch(GQL_API_ENDPOINT, {
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + serviceAccountId
      },
      method: 'POST',
      body: JSON.stringify({
        query: GET_DNS_ZONES,
        variables: {
          organizationId,
          ...(cloud ? ({
            input: {
              filter: {
                cloud
              }
            }
          }) : {}),
        }
      })
    }
  })

  return {
    data: data?.data?.dnsZones,
    loading,
    error: formatErrors(data, error)
  }
}

export default useGetDnsZones
