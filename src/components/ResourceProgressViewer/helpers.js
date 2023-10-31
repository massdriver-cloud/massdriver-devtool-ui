import CircularProgress from '@mui/material/CircularProgress'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Box from '@mui/material/Box'

export const getStatusColor = status => {
  switch (status) {
    case 'detected':
      return 'purple'
    case 'pending':
      return 'yellow'
    case 'running':
      return 'orange'
    case 'completed':
      return 'green'
    case 'failed':
      return 'red'
  }
}

export const getStatusIcon = status => {
  switch (status) {
    case 'detected':
      return CheckCircleOutlineIcon
    case 'pending':
      return Box
    case 'running':
      return CircularProgress
    case 'completed':
      return CheckCircleOutlineIcon
    case 'failed':
      return HighlightOffIcon
    default:
      return CircularProgress
  }
}

export const resourceNameOrEllipsis = (resource, index = 0) => {
  return index === 0 ? `${resource.type} '${resource.name}'` : '...'
}

export const formatResources = resources =>
  resources?.reduce(
    (prev, current) =>
      current?.key
        ? {
          ...prev,
          [`${current?.type}-${current?.name}`]: {
            ...prev[`${current?.type}-${current?.name}`],
            [current?.key]: current
          }
        }
        : {
          ...prev,
          [`${current?.type}-${current?.name}`]: current
        },
    {}
  )

const processLabelByStatus = {
  COMPLETED: (action, _) => action && `${action.toUpperCase()}ED`,
  INITIALIZED: (_, status) => status,
  default: (action, status) =>
    action && status ? `${action.toUpperCase()}ING_${status.toUpperCase()}` : ''
}

export const getDeploymentStatusLabel = ({ action, status } = {}) => {
  const processStatus =
    processLabelByStatus[status] || processLabelByStatus.default
  return !action && !status ? undefined : processStatus(action, status)
}
