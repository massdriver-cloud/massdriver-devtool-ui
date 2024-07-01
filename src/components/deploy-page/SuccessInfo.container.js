import useToggle from 'hooks/useToggle'
import SuccessInfo from 'components/deploy-page/SuccessInfo'


const EnhancedSuccessInfo = ({ artifacts, status, action, deploymentEvents }) => {
  const { isOpen, open, close } = useToggle()

  return (
    <SuccessInfo
      isOpen={isOpen}
      open={open}
      close={close}
      artifacts={artifacts}
      status={status}
      action={action}
      deploymentEvents={deploymentEvents}
    />
  )
}

export default EnhancedSuccessInfo
