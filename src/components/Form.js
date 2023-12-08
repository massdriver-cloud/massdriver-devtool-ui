import createForm from '@massdriver/forms'

// Services
import useGetDnsZones from '../hooks/queries/useGetDnsZones'
import useGetSupportedCloudLocations from '../hooks/queries/useGetSupportedCloudLocations'

const Form = createForm({
  services: {
    getSupportedCloudLocations: useGetSupportedCloudLocations,
    getDnsZones: useGetDnsZones
  }
})

export default Form
