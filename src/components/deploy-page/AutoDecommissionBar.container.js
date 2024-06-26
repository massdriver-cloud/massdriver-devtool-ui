import { useState, useEffect } from 'react'

import AutoDecommissionBar from 'components/deploy-page/AutoDecommissionBar'
import useGetContainerInfo from 'hooks/queries/useGetContainerInfo'
import { INITIALIZED, PENDING, RUNNING, COMPLETED, FAILED } from 'constants/progress-statuses'

import useCountdown from '@bradgarropy/use-countdown'

const EVENT_STATUS_MAP = {
  start: 'pending',
  progress: 'running',
  complete: 'completed',
  errored: 'failed'
}

const EnhancedAutoDecommissionBar = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [status, setStatus] = useState(INITIALIZED)
  const [containerId, setContainerId] = useState('')
  const { data } = useGetContainerInfo({ containerId })
  const { name: containerName } = data || {}

  const onDecommissionClick = () => fetch('http://127.0.0.1:8080/bundle/deploy', {
    method: 'POST',
    headers: {
      'Content-type': "application/json"
    },
    body: JSON.stringify({
      action: 'decommission',
    })
  })
    .then(res => res.json())
    .then(data => {
      if (!data?.containerID) {
        setStatus(FAILED)
        return
      }
      setContainerId(data?.containerID)
      setStatus(PENDING)
    })
    .catch(() => setStatus(FAILED))

  const countdown = useCountdown({
    minutes: 0,
    seconds: 30,
    format: 'mm:ss',
    autoStart: true,
    onCompleted: onDecommissionClick
  })

  useEffect(() => {
    if (containerId) {
      const containerLogsSocket = new WebSocket(`ws://127.0.0.1:8080/containers/logs?id=${containerId}`)

      containerLogsSocket.onmessage = event => {
        const parsedEvent = JSON.parse(event.data)

        const status = EVENT_STATUS_MAP[parsedEvent?.type?.split('_')?.[1]]

        const data = parsedEvent?.hook || parsedEvent?.change

        if (parsedEvent['@level'] !== undefined && status && ['create', 'update', 'delete'].includes(data?.action)) {
          setStatus(RUNNING)
          return
        }

        if (parsedEvent['@message']?.includes('Apply complete!')) {
          setStatus(COMPLETED)
          return
        }
        if (parsedEvent['@level'] === 'error') {
          setStatus(FAILED)
          return
        }
      }
    }
  }, [containerId])

  const onAdd15MinutesClick = () => {
    countdown.reset({ minutes: countdown.minutes + 15, seconds: countdown.seconds })
  }

  const onCancelClick = () => {
    setIsCancelled(true)
    countdown.pause()
  }

  const onBackClick = () => window.location.pathname = '/'

  // Remove page-leave event if decommissioned
  useEffect(() => {
    if ([COMPLETED, FAILED].includes(status)) {
      window.onbeforeunload = undefined
    }
  }, [status])

  return (
    <AutoDecommissionBar
      containerName={containerName}
      countdown={countdown}
      isCancelled={isCancelled}
      status={status}
      onAdd15MinutesClick={onAdd15MinutesClick}
      onCancelClick={onCancelClick}
      onDecommissionClick={onDecommissionClick}
      onBackClick={onBackClick}
    />
  )
}

export default EnhancedAutoDecommissionBar
