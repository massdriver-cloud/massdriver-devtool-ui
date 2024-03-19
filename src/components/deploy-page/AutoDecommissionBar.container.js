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
    format: 's',
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

  const onCancelClick = () => {
    setIsCancelled(true)
    countdown.pause()
  }

  const onBackClick = () => window.location.pathname = '/'

  return (
    <AutoDecommissionBar
      containerName={containerName}
      countdown={countdown.formatted}
      isCancelled={isCancelled}
      status={status}
      onCancelClick={onCancelClick}
      onDecommissionClick={onDecommissionClick}
      onBackClick={onBackClick}
    />
  )
}

export default EnhancedAutoDecommissionBar
