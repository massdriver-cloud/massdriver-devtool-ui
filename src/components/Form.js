import createForm from '@massdriver/forms'

// Services
import useGetDnsZones from 'hooks/services/useGetDnsZones'
import useGetSupportedCloudLocations from 'hooks/services/useGetSupportedCloudLocations'
import useGetInstanceTypes from 'hooks/services/useGetInstanceTypes'
import useGetArtifactDefinitions from 'hooks/services/useGetArtifactDefinitions'
import useGetCredentials from 'hooks/services/useGetCredentials'
import useGetFilteredArtifactCredentials from 'hooks/services/useGetFilteredArtifactCredentials'

const Form = createForm({
  services: {
    getSupportedCloudLocations: useGetSupportedCloudLocations,
    getDnsZones: useGetDnsZones,
    getInstanceTypes: useGetInstanceTypes,
    getArtifactDefinitions: useGetArtifactDefinitions,
    getCredentials: useGetCredentials,
    getFilteredArtifactCredentials: useGetFilteredArtifactCredentials
  }
})

export default Form
