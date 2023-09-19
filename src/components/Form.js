import Form from '@massdriver/forms'
import useGetDnsZones from '../hooks/queries/useGetDnsZones'
import useGetSupportedCloudLocations from '../hooks/queries/useGetSupportedCloudLocations'

const CustomForm = props => (
  <Form
    services={{
      getSupportedCloudLocations: useGetSupportedCloudLocations,
      getDnsZones: useGetDnsZones
    }}
    {...props}
  />
)

export default CustomForm
