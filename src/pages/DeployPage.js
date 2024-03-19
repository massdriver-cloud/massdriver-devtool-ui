import { useState } from 'react'
import stylin from 'utils/stylin'

import useGetDeploySteps from 'hooks/queries/useGetDeploySteps'
import Stepper from 'components/Stepper/Stepper.container'
import LoadingSpinner from 'components/LoadingSpinner'
import ProvisionInfo from 'components/deploy-page/ProvisionInfo.container'
import { INITIALIZED } from 'constants/progress-statuses'

import Typography from '@mui/material/Typography'

const DeployPage = () => {
  const { data, loading, error } = useGetDeploySteps()

  const [provisioningStatus, setProvisioningStatus] = useState(INITIALIZED)
  const [provisioningAction, setProvisioningAction] = useState('')
  const [containerId, setContainerId] = useState('')

  const updateProvisioningStatus = (status, action, containerId) => {
    containerId && setContainerId(containerId)
    status && setProvisioningStatus(status)
    action && setProvisioningAction(action)
  }

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <EmptyMessage>Error: There was an issue parsing your configuration form.</EmptyMessage>
  ) : provisioningStatus === INITIALIZED ? (
    <Stepper
      steps={data}
      childProps={{ updateProvisioningStatus }}
    />
  ) : (
    <ProvisionInfo
      status={provisioningStatus}
      action={provisioningAction}
      updateProvisioningStatus={updateProvisioningStatus}
      containerId={containerId}
    />
  )
}

export default DeployPage

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
  px: '30px',
  py: '20px'
}))
