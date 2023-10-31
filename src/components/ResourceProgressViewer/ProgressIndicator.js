import { getStatusColor, getStatusIcon } from './helpers'

const ProgressIndicator = ({ status, deploymentStatus }) => {
  const Icon = getStatusIcon(status)
  return (
    <Icon
      style={{
        color: getStatusColor(status),
        height: '20px',
        width: '20px',
        margin: '0 6px',
        ...(status === 'running' &&
          (deploymentStatus === 'FAILED' ||
            deploymentStatus === 'COMPLETED') && {
            opacity: 0,
            transition: 'opacity 0.5s ease-out'
          })
      }}
    />
  )
}

export default ProgressIndicator
