import { useState } from 'react'
import createForm from '@massdriver/forms'

import useFetch from '../hooks/useFetch'
import { GQL_API_ENDPOINT } from '../constants/api'

const GET_SUPPORTED_LOCATIONS = `
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

const Form = props => {
  const [cloud, setCloud] = useState()
  const [cloudService, setCloudService] = useState()

  const variables = {
    organizationId: '90ea395a-235c-4138-8c29-768422c8b443',
    serviceAccount: 'b4YqmStsYKunUvpYwWqRUu/5htiUJPcehF1lvQuL5DYuJ9fcr6K+bio+HapiI5wXMydyywPER5zElVCxMMMR4A=='
  }

  const { data: dnsZonesData, loading: dnsZonesLoading, error: dnsZonesError } = useFetch(GQL_API_ENDPOINT, {
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + variables?.serviceAccount
      },
      method: 'POST',
      body: JSON.stringify({
        query: GET_DNS_ZONES,
        variables: {
          organizationId: variables?.organizationId,
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

  const { data: supportedLocationsData, loading: supportedLocationsLoading, error: supportedLocationsError } = useFetch(GQL_API_ENDPOINT, {
    skip: !cloudService,
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + variables?.serviceAccount
      },
      method: 'POST',
      body: JSON.stringify({
        query: GET_SUPPORTED_LOCATIONS,
        variables: {
          organizationId: variables?.organizationId,
          cloudService,
        }
      })
    }
  })


  const GeneratedForm = createForm({
    services: {
      getDnsZones: ({ cloud }) => {
        setCloud(cloud)

        return { data: dnsZonesData, loading: dnsZonesLoading, error: dnsZonesError }
      },
      getSupportedCloudLocations: ({ cloudService }) => {
        setCloudService(cloudService)

        return { data: supportedLocationsData, loading: supportedLocationsLoading, error: supportedLocationsError }
      }
    }
  })


  return (
    <GeneratedForm {...props} />
  )
}

export default Form
