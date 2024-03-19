import stylin from 'utils/stylin'

import { FAILED, COMPLETED } from 'constants/progress-statuses'
import ResourceProgressView from 'components/deploy-page/ResourceProgressView'
import SuccessInfo from 'components/deploy-page/SuccessInfo.container'
import FailInfo from 'components/deploy-page/FailInfo.container'

import Box from '@mui/material/Box'

const ProvisionInfo = ({
  action,
  status,
  updateProvisioningStatus,
  containerId
}) => (
  <Container>
    {
      status === COMPLETED ? (
        <SuccessInfo containerId={containerId} />
      ) : status === FAILED ? (
        <FailInfo />
      ) : (
        <ResourceProgressView
          action={action}
          status={status}
          updateProvisioningStatus={updateProvisioningStatus}
          containerId={containerId}
        />
      )
    }
  </Container>
)

export default ProvisionInfo

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})
