
import ProvisionInfo from 'components/deploy-page/ProvisionInfo'

const EnhancedProvisionInfo = ({
  status,
  action,
  updateProvisioningStatus,
  containerId,
}) => {

  return (
    <ProvisionInfo
      action={action}
      status={status}
      updateProvisioningStatus={updateProvisioningStatus}
      containerId={containerId}
    />
  )
}

export default EnhancedProvisionInfo
