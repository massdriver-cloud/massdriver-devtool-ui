// import { useState } from 'react'
// import stylin from 'utils/stylin'

// import useGetDeploySteps from 'hooks/queries/useGetDeploySteps'
// import Stepper from 'components/Stepper/Stepper.container'
// import LoadingSpinner from 'components/LoadingSpinner'
// import ProvisionInfo from 'components/deploy-page/ProvisionInfo.container'
// import { INITIALIZED } from 'constants/progress-statuses'

import Typography from "@mui/material/Typography"
import Custom404 from "components/Custom404"
const DeployPage = () => {
  return (
    <Custom404>
      <Typography sx={{ fontSize: "4rem", fontWeight: "bold" }}>404</Typography>
      <Typography variant="h1">Page not found</Typography>
    </Custom404>
  )

  // const { data, loading, error } = useGetDeploySteps()

  // const [provisioningStatus, setProvisioningStatus] = useState(INITIALIZED)
  // const [provisioningAction, setProvisioningAction] = useState('')
  // const [containerId, setContainerId] = useState('')
  // const [artifacts, setArtifacts] = useState([])
  // const [deploymentEvents, setDeploymentEvents] = useState([])

  // const updateProvisioningStatus = ({ status, action, containerId, artifact, deploymentEvents }) => {
  //   if (containerId) {
  //     setContainerId(containerId)
  //     setProvisioningStatus(INITIALIZED)
  //     setProvisioningAction('')
  //     setArtifacts([])
  //     setDeploymentEvents([])
  //   }
  //   status && setProvisioningStatus(status)
  //   action && setProvisioningAction(action)
  //   artifact && setArtifacts(artifacts => [...artifacts, artifact])
  //   deploymentEvents && setDeploymentEvents(deploymentEvents)
  // }

  // return loading ? (
  //   <LoadingSpinner />
  // ) : error ? (
  //   <EmptyMessage>Error: There was an issue parsing your configuration form.</EmptyMessage>
  // ) : provisioningStatus === INITIALIZED ? (
  //   <Stepper
  //     steps={data}
  //     childProps={{ updateProvisioningStatus }}
  //   />
  // ) : (
  //   <ProvisionInfo
  //     status={provisioningStatus}
  //     action={provisioningAction}
  //     updateProvisioningStatus={updateProvisioningStatus}
  //     containerId={containerId}
  //     artifacts={artifacts}
  //     deploymentEvents={deploymentEvents}
  //   />
  // )
}

export default DeployPage

// const EmptyMessage = stylin(Typography)(({ theme }) => ({
//   fontSize: '14px',
//   color: theme.palette.grey[900],
//   fontWeight: 'bold',
//   px: '30px',
//   py: '20px'
// }))
