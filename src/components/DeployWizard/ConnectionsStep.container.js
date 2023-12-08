import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useAuth } from '../../contexts/authContext'
import { parseJson } from '../../utils/data'

import ConnectionsStep from './ConnectionsStep'
import useGetConnectionsData from '../../hooks/queries/useGetConnectionsData'
import { GQL_API_ENDPOINT } from '../../constants/api'


const DOWNLOAD_ARTIFACT = `
  query downloadArtifact($organizationId: ID!, $artifactId: ID!, $format: DownloadFormat!) {
    downloadArtifact(
      organizationId: $organizationId
      artifactId: $artifactId
      format: $format
    ) {
      renderedArtifact
    }
  }
`

const EnhancedConnectionsStep = ({
  next,
}) => {
  const { organizationId, serviceAccountId } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const [formData, setFormData] = useState({})
  const [submitLoading, setSubmitLoading] = useState(false)

  const { connectionTypesMap, connectionTypes, currentlySetConnections, hasConnectionSetMap, loading, error } = useGetConnectionsData()

  useEffect(() => {
    const initialFormData = connectionTypes?.reduce((acc, cur) => ({ ...acc, [cur]: undefined }), {})

    for (const key in currentlySetConnections || {}) {
      initialFormData[key] = JSON.stringify(currentlySetConnections?.[key]).match('"REPLACE ME"') ? undefined : 'currentlySet'
    }

    setFormData(initialFormData)

  }, [connectionTypes, currentlySetConnections])

  const onChange = event => setFormData(formData => ({
    ...formData,
    [event.target.name]: event.target.value
  }))

  const onSubmit = async () => {
    setSubmitLoading(true)

    const payload = {}
    for (const key in formData) {
      if (formData[key] === 'currentlySet') {
        payload[connectionTypesMap[key]] = currentlySetConnections[key]
        continue
      }

      const response = await fetch(GQL_API_ENDPOINT, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + serviceAccountId
        },
        method: 'POST',
        body: JSON.stringify({
          query: DOWNLOAD_ARTIFACT,
          variables: {
            organizationId: organizationId,
            artifactId: formData[key],
            format: 'RAW'
          }
        })
      })
      const data = await response.json()
      const { parsedJson } = parseJson(data?.data?.downloadArtifact?.renderedArtifact)
      payload[connectionTypesMap[key]] = parsedJson
    }
    const response = await fetch('http://127.0.0.1:8080/bundle/connections', {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(payload)
    })

    response?.ok ? next() : enqueueSnackbar("There was an issue saving your connections", {
      variant: 'error',
      preventDuplicate: true,
      autoHideDuration: 5000,
      disableWindowBlurListener: true
    })
    setSubmitLoading(false)
  }

  const isMissingFormData = !loading ? connectionTypes?.some(type => formData?.[type] === undefined) : true

  return (
    <ConnectionsStep
      loading={loading}
      error={error}
      hasConnectionSetMap={hasConnectionSetMap}
      types={connectionTypes}
      onChange={onChange}
      formData={formData}
      onSubmit={onSubmit}
      submitLoading={submitLoading}
      isMissingFormData={isMissingFormData}
    />
  )
}

export default EnhancedConnectionsStep
