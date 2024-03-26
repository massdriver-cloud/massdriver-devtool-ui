
import ReviewStep from 'components/deploy-page/ReviewStep'
import { PENDING } from 'constants/progress-statuses'
import useCheckHasSecrets from 'hooks/queries/useCheckHasSecrets'
import useNotice from 'hooks/useNotice'

const EnhancedReviewStep = ({
  updateProvisioningStatus,
  ...props
}) => {
  const { errorNotice, infoNotice } = useNotice()

  const { hasSecrets, loading, error } = useCheckHasSecrets()

  const onNext = () => hasSecrets ? { successful: true } : fetch('http://127.0.0.1:8080/bundle/deploy', {
    method: 'POST',
    headers: {
      'Content-type': "application/json"
    },
    body: JSON.stringify({ action: 'provision' })
  })
    .then(res => res.json())
    .then(data => {
      infoNotice("Started Deployment.", {
        preventDuplicate: true,
        autoHideDuration: 5000,
        disableWindowBlurListener: true
      })
      updateProvisioningStatus({ status: PENDING, action: 'provision', containerId: data?.containerID })
    })
    .catch(err => {
      errorNotice("There was an issue starting the deployment.", {
        preventDuplicate: true,
        autoHideDuration: 5000,
        disableWindowBlurListener: true
      })
      errorNotice(err.toString())
      return { successful: false }
    })

  return (
    <ReviewStep
      loading={loading}
      error={error}
      onNext={onNext}
      {...props}
    />
  )
}

export default EnhancedReviewStep
