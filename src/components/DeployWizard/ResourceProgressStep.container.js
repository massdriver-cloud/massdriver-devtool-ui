import { useState, useEffect } from 'react'
import ResourceProgressViewer from '../ResourceProgressViewer/ResourceProgressViewer'
import { formatResources } from '../ResourceProgressViewer/helpers'

const EVENT_STATUS_MAP = {
  start: 'pending',
  progress: 'running',
  complete: 'completed',
  errored: 'failed'
}

const EnhancedResourceProgressStep = ({
  next,
  data
}) => {
  const [status, setStatus] = useState('PENDING')
  const [events, setEvents] = useState([])

  const { action, containerId } = data

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
        setStatus('RUNNING')
      }

      if (parsedEvent['@message']?.includes('Apply complete!')) {
        setStatus('COMPLETED')
        setTimeout(() => next({ action, status: 'COMPLETED' }), 1000)
        return
      }
      if (parsedEvent['@level'] === 'error') {
        setStatus('FAILED')
        setTimeout(() => next({ action, status: 'FAILED' }), 1000)
        return
      }
    }
  }, [])

  return (
    <ResourceProgressViewer
      formattedAction={`${data?.action}ing`}
      action={data?.action || ''}
      resources={formatResources(events)}
      deploymentStatus={status}
    />
  )
}

export default EnhancedResourceProgressStep
