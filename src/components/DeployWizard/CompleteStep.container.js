import { useState } from 'react'
import { useSnackbar } from 'notistack'

import CompleteStep from './CompleteStep'


const EnhancedCompleteStep = ({
  next,
  data
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)

  const onDecommissionClick = () => {
    setIsLoading(true)

    fetch('http://127.0.0.1:8080/bundle/deploy', {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify({
        action: 'decommission'
      })
    })
      .then(res => res.json())
      .then(data => {
        enqueueSnackbar("Started Deployment.", {
          variant: 'info',
          preventDuplicate: true,
          autoHideDuration: 5000,
          disableWindowBlurListener: true
        })
        next({ containerId: data?.containerID, action: 'decommission' })
      })
      .catch(err => {
        console.log(err)
        enqueueSnackbar("There was an issue starting the deployment.", {
          variant: 'error',
          preventDuplicate: true,
          autoHideDuration: 5000,
          disableWindowBlurListener: true
        })
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <CompleteStep
      action={data?.action}
      status={data?.status}
      onDecommissionClick={onDecommissionClick}
      isLoading={isLoading}
    />
  )
}

export default EnhancedCompleteStep
