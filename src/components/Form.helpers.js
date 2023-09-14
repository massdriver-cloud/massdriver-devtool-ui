import { GQL_API_ENDPOINT } from '../constants/api'

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

export const createServices = ({ organizationId, serviceAccountId }) => ({
  getDnsZones: ({ cloud }) => ({
    fetch: () => fetch(GQL_API_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + serviceAccountId
      },
      method: 'POST',
      body: JSON.stringify({
        query: GET_DNS_ZONES,
        variables: {
          organizationId: organizationId,
          ...(cloud ? ({
            input: {
              filter: {
                cloud
              }
            }
          }) : {}),
        }
      })
    }),
    format: ({ data, loading, error }) => ({
      data: data?.data?.dnsZones,
      loading,
      error: data?.errors ? data?.errors?.reduce((prev, cur) => ({ messages: [...prev?.messages, cur.message] }), { messages: [] }) : error
    })
  }),
  getSupportedCloudLocations: ({ cloudService }) => ({
    fetch: () => fetch(GQL_API_ENDPOINT, {
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
    }),
    format: ({ data, loading, error }) => ({
      data: data?.data?.supportedLocations?.locations,
      loading,
      error: data?.errors ? data?.errors?.reduce((prev, cur) => ({ messages: [...prev?.messages, cur.message] }), { messages: [] }) : error
    })
  })
})
