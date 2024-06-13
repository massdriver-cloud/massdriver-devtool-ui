import { useState, useEffect } from 'react'
import ResourceProgressViewer from 'components/ResourceProgressViewer/ResourceProgressViewer'

import { COMPLETED, FAILED, RUNNING } from 'constants/progress-statuses'

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
      // First event: change status to running
      if (events.length === 0) {
        updateProvisioningStatus({ status: RUNNING })
      }

      // Add event to list
      setEvents(events => [...events, event.data])

      // Store artifact if there is one
      const parsedEvent = JSON.parse(event.data)
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
  }, [])

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
