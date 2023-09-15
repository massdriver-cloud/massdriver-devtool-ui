import { useState } from 'react'

import { getTypeFromId } from './ConnectionsView.helpers'
import ConnectionsView from './ConnectionsView'
import useFetch from '../hooks/useFetch'



const EnhancedConnectionsView = () => {
  const [formData, setFormData] = useState({})

  const { data, loading, error } = useFetch('http://127.0.0.1:8080/schema-connections.json')

  const connectionTypes = Object.keys(data?.properties || {}).map(key => getTypeFromId(data?.properties?.[key]?.$id))

  const onChange = event => setFormData(formData => ({
    ...formData,
    [event.target.name]: event.target.value
  }))

  const onSubmit = () => {
    console.log({ formData })
  }

  return (
    <ConnectionsView
      loading={loading}
      error={error}
      types={connectionTypes}
      onChange={onChange}
      formData={formData}
      onSubmit={onSubmit}
    />
  )
}

export default EnhancedConnectionsView
