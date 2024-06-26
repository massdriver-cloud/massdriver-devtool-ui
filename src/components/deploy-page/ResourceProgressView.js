import { useState, useEffect } from 'react'
import ResourceProgressViewer from 'components/ResourceProgressViewer/ResourceProgressViewer'

import { COMPLETED, FAILED, RUNNING } from 'constants/progress-statuses'

const EVENT_STATUS_MAP = {
  start: 'pending',
  progress: 'running',
  complete: 'completed',
  errored: 'failed'
}

const ResourceProgressView = ({
  updateProvisioningStatus,
  status,
  action,
  containerId
}) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const containerLogsSocket = new WebSocket(`ws://127.0.0.1:8080/containers/logs?id=${containerId}`)
    containerLogsSocket.onmessage = event => {

      setEvents(events => [...events, event.data])

      const parsedEvent = JSON.parse(event.data)
      const status = EVENT_STATUS_MAP[parsedEvent?.type?.split('_')?.[1]]
      const data = parsedEvent?.hook || parsedEvent?.change

      if (parsedEvent['@level'] !== undefined && status && ['create', 'update', 'delete'].includes(data?.action)) {
        updateProvisioningStatus({ status: RUNNING })
      }

      if (parsedEvent?.payload?.error_details?.match('artifact_created')) {
        const artifact = JSON.parse(JSON.parse(JSON.parse(parsedEvent.payload.error_details)?.detail)?.Message)?.payload?.artifact

        artifact && updateProvisioningStatus({ artifact })
      }

      if (parsedEvent['@message']?.includes('Apply complete!')) {
        updateProvisioningStatus({ status: COMPLETED })
        return
      }
      if (parsedEvent['@level'] === 'error') {
        updateProvisioningStatus({ status: FAILED })
        return
      }
    }

    return () => containerLogsSocket.close()
  }, [])

  // This useEffect is saving all the deployment logs to state on a deploy success/failure.
  // Another useEffect is needed because websocket .onmessage does not get state updates, so 'events' is an empty array.
  useEffect(() => {
    const lastEvent = events[events.length - 1]
    const parsedEvent = lastEvent && JSON.parse(lastEvent)

    if (parsedEvent?.['@message']?.includes('Apply complete!') || parsedEvent?.['@level'] === 'error') updateProvisioningStatus({ deploymentEvents: events })

  }, [events])

  return (
    <ResourceProgressViewer
      formattedAction={`${action}ing`}
      action={action || ''}
      resources={events}
      deploymentStatus={status}
    />
  )
}

export default ResourceProgressView
