import { useState, useEffect } from 'react'
import { parseJson } from 'utils/data'

import { useAuth } from 'contexts/authContext'
import { GQL_API_ENDPOINT } from 'constants/api'
import ConnectionsStep from 'components/deploy-page/ConnectionsStep'
import useGetPossibleConnections from 'hooks/queries/useGetPossibleConnections'
import useToggle from 'hooks/useToggle'
import useNotice from 'hooks/useNotice'


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

const IS_SET = 'isSet'
const MANUAL = 'manual'

// Gets initial form data state
const getInitialFormData = data => ({
  ...data?.credentials?.reduce((acc, cur) => ({
    ...acc,
    [cur.id]: cur.isSet ? IS_SET : ''
  }), {}),
  ...data?.normal?.reduce((acc, cur) => ({
    ...acc,
    [cur.id]: cur.isSet ? IS_SET : ''
  }), {})
})

// Checks if form data has any manual values
const hasManual = data => Object.keys(data).some(key => data[key] === MANUAL)
// Checks if value is manual or set
const isManualOrSetOrBlank = value => value === IS_SET || value === MANUAL || value === ''

// Preps the payload for submitting connections
const prepPayload = async (formData, currentConnections, fetchCredentials) => {
  const payload = {}
  for (const key in formData) {
    if (isManualOrSetOrBlank(formData[key])) {
      payload[key] = currentConnections?.[key] || {}
      continue
    }

    payload[key] = await fetchArtifactData(formData[key], fetchCredentials)
  }
  return payload
}

const fetchArtifactData = async (artifactId, { serviceAccountId, organizationId }) => fetch(GQL_API_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + serviceAccountId
  },
  method: 'POST',
  body: JSON.stringify({
    query: DOWNLOAD_ARTIFACT,
    variables: {
      organizationId: organizationId,
      artifactId,
      format: 'RAW'
    }
  })
}).then(response => response.json())
  .then(data => parseJson(data?.data?.downloadArtifact?.renderedArtifact)?.parsedJson || {})
  .catch(err => console.warn(`Error fetching artifact data: ${key}`, err.toString()))

const EnhancedConnectionsStep = ({
  // Stepper helpers
  updateActionStates,
  generateNext,
  stepData,
  ...props
}) => {
  const { organizationId, serviceAccountId } = useAuth()
  const { errorNotice } = useNotice()
  const [formData, setFormData] = useState({})

  const { data, loading, error } = useGetPossibleConnections()
  const { possibleConnections, currentConnections } = data || {}

  // update formdata with previously set connections
  useEffect(() => setFormData(stepData ? stepData : getInitialFormData(possibleConnections)), [possibleConnections])

  // update formdata once required connections are set
  const isNextDisabled = possibleConnections ? [...possibleConnections.credentials || [], ...possibleConnections.normal || []].some(connection => connection.required && formData[connection.id] === '') : true

  useEffect(() => !isNextDisabled && updateActionStates(states => ({ ...states, next: { ...states.next, disabled: false } })), [formData])

  const onChange = event => setFormData(formData => ({ ...formData, [event.target.name]: event.target.value }))

  const onNext = () => hasManual(formData) ? openModal() : onSubmit()

  const onSubmit = async () => {
    const payload = await prepPayload(formData, currentConnections, { organizationId, serviceAccountId })

    return fetch('http://127.0.0.1:8080/bundle/connections', {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(() => ({
        successful: true,
        data: formData
      }))
      .catch(error => {
        errorNotice(error.toString())
      })
  }

  // Confirmation modal stuff - start
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useToggle()
  // custom stepper next function. Needed so we can trigger next on modal confirm click.
  const _next = generateNext(onSubmit)

  // Modal confirm click
  const onConfirmModal = () => {
    closeModal()
    _next()
  }

  // Confirmation modal stuff - end

  return (
    <ConnectionsStep
      loading={loading}
      error={error}
      connections={possibleConnections}
      formData={formData}
      onChange={onChange}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      onConfirmModal={onConfirmModal}
      next={onNext}
      {...props}
    />
  )
}

export default EnhancedConnectionsStep
