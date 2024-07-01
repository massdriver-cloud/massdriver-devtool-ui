import useToggle from 'hooks/useToggle'
import FailInfo from 'components/deploy-page/FailInfo'

const EnhancedFailInfo = ({ status, action, deploymentEvents }) => {
  const { isOpen, open, close } = useToggle()

  return (
    <FailInfo
      isOpen={isOpen}
      open={open}
      close={close}
      status={status}
      action={action}
      deploymentEvents={deploymentEvents}
    />
  )
}

export default EnhancedFailInfo
