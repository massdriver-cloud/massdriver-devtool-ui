import { useEffect } from 'react'

import ProvisionInfo from 'components/deploy-page/ProvisionInfo'

const EnhancedProvisionInfo = ({
  status,
  action,
  updateProvisioningStatus,
  containerId,
  artifacts,
  deploymentEvents
}) => {

  // Adds confirmation modal on page leave
  useEffect(() => {
    window.onbeforeunload = () => 'Leaving this page will orphan deployed resources. You will have to manually destroy them in the cloud console.'
    return () => window.onbeforeunload = undefined
  }, [])

  return (
    <ProvisionInfo
      action={action}
      status={status}
      updateProvisioningStatus={updateProvisioningStatus}
      containerId={containerId}
      artifacts={artifacts}
      deploymentEvents={deploymentEvents}
    />
  )
}

export default EnhancedProvisionInfo
