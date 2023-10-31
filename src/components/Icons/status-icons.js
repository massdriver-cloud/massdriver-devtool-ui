import stylin from '../../utils/stylin'
import { colors } from '../../theme/theme-colors'
import RunningIcon from './RunningIcon'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import CancelIcon from '@mui/icons-material/Cancel'
import PendingIcon from '@mui/icons-material/Pending'
import CircleIcon from '@mui/icons-material/Circle'
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection'

import CloudIcon from '@mui/icons-material/Cloud'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import CloudOffIcon from '@mui/icons-material/CloudOff'

const OkStatusCloudIcon = stylin(CloudDoneIcon)({
  '&.MuiSvgIcon-root': {
    position: 'absolute',
    top: '7px',
    left: '10px',
    color: 'success.main',
    width: '1.3rem',
    height: '1.3rem'
  }
})

const AlarmStatusCloudIcon = stylin(CloudIcon)({
  '&.MuiSvgIcon-root': {
    position: 'absolute',
    top: '7px',
    left: '10px',
    color: 'error.main',
    width: '1.3rem',
    height: '1.3rem'
  }
})

export const NoAlarmChannelCloudIcon = stylin(CloudOffIcon)({
  '&.MuiSvgIcon-root': {
    position: 'absolute',
    top: '7px',
    left: '10px',
    color: theme => theme.colors.alpha.black[30],
    width: '1.3rem',
    height: '1.3rem'
  }
})

// const InsufficientDataStatusCloudIcon = stylin(CloudIcon)({
//   '&.MuiSvgIcon-root': {
//     position: 'absolute',
//     top: '7px',
//     left: '10px',
//     color: theme => theme.colors.alpha.black[30],
//     width: '1.3rem',
//     height: '1.3rem'
//   }
// })

export const OkStatusDot = stylin(CheckCircleIcon)({
  color: 'success.main'
})

export const AlarmStatusDot = stylin(ErrorIcon)({
  color: 'error.main'
})

// const InsufficientDataStatusDot = stylin(CircleIcon)({
//   color: theme => theme.colors.alpha.black[30]
// })

export const OK = 'OK'
export const INSUFFICIENT_DATA = 'INSUFFICIENT_DATA'
export const ALARM = 'ALARM'
export const NO_STATUS = 'NO_STATUS'

export const STATUS_DOT_MAP = {
  [OK]: OkStatusDot,
  [INSUFFICIENT_DATA]: OkStatusDot,
  [ALARM]: AlarmStatusDot
}

export const CLOUD_STATUS_ICON_MAP = {
  [OK]: OkStatusCloudIcon,
  // [INSUFFICIENT_DATA]: InsufficientDataStatusCloudIcon,
  [INSUFFICIENT_DATA]: OkStatusCloudIcon,
  [ALARM]: AlarmStatusCloudIcon,
  [NO_STATUS]: NoAlarmChannelCloudIcon
}

export const INITIALIZED = 'INITIALIZED'
export const PROVISION = {
  PROVISIONED: 'PROVISIONED',
  PENDING: 'PROVISIONING_PENDING',
  RUNNING: 'PROVISIONING_RUNNING',
  FAILED: 'PROVISIONING_FAILED'
}
export const DECOMMISSION = {
  DECOMMISSIONED: 'DECOMMISSIONED',
  PENDING: 'DECOMMISSIONING_PENDING',
  RUNNING: 'DECOMMISSIONING_RUNNING',
  FAILED: 'DECOMMISSIONING_FAILED'
}
export const EXTERNAL = 'EXTERNAL'

const withColor =
  (Icon, status) =>
    (sx, ...restProps) =>
    (
      <Icon
        sx={{
          color: colors.status[status],
          ...sx
        }}
        {...restProps}
      />
    )

export const DEPLOYMENT_STATUS_ICONS = {
  [INITIALIZED]: CircleIcon,
  [PROVISION.PROVISIONED]: CheckCircleIcon,
  [PROVISION.PENDING]: PendingIcon,
  [PROVISION.RUNNING]: RunningIcon,
  [PROVISION.FAILED]: CancelIcon,
  [DECOMMISSION.DECOMMISSIONED]: CircleIcon,
  [DECOMMISSION.PENDING]: PendingIcon,
  [DECOMMISSION.RUNNING]: RunningIcon,
  [DECOMMISSION.FAILED]: CancelIcon,
  [EXTERNAL]: AssistantDirectionIcon
}

export const DEPLOYMENT_STATUS_ICONS_WITH_COLOR = Object.keys(
  DEPLOYMENT_STATUS_ICONS
).reduce(
  (prev, curr) => ({
    ...prev,
    [curr]: withColor(DEPLOYMENT_STATUS_ICONS[curr], curr)
  }),
  {}
)
