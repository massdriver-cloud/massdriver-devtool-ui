import { useState, useEffect } from 'react'
import ResourceProgressViewer from 'components/ResourceProgressViewer/ResourceProgressViewer'
import { formatResources } from 'components/ResourceProgressViewer/helpers'

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
      const parsedEvent = JSON.parse(event.data)

      const status = EVENT_STATUS_MAP[parsedEvent?.type?.split('_')?.[1]]

      const data = parsedEvent?.hook || parsedEvent?.change

      if (parsedEvent['@level'] !== undefined && status && ['create', 'update', 'delete'].includes(data?.action)) {
        setEvents(events => {
          const newResource = {
            action: data?.action,
            key: data?.resource?.resource_key,
            name: data?.resource?.resource_name,
            status: status,
            type: data?.resource?.resource_type?.split('_')?.join(' '),
          }


          const alreadyExists = events?.some(event => `${event.type}-${event.name}` === `${newResource.type}-${newResource.name}` && event?.key === newResource?.key)

          return alreadyExists ? events.map(event => (`${event.type}-${event.name}` === `${newResource.type}-${newResource.name}` && event?.key === newResource?.key) ? newResource : event) : [...events, newResource]
        })
        updateProvisioningStatus(RUNNING)
      }

      if (parsedEvent['@message']?.includes('Apply complete!')) {
        updateProvisioningStatus(COMPLETED)
        return
      }
      if (parsedEvent['@level'] === 'error') {
        updateProvisioningStatus(FAILED)
        return
      }
    }
  }, [])

  return (
    <ResourceProgressViewer
      formattedAction={`${action}ing`}
      action={action || ''}
      resources={formatResources(events)}
      deploymentStatus={status}
    />
  )
}

export default ResourceProgressView
