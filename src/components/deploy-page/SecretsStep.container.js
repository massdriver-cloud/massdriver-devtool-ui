import { useState, useEffect, useMemo } from 'react'
import { isValidJsonObject } from 'utils/data'

import useGetSecrets from 'hooks/queries/useGetSecrets'
import SecretsStep from 'components/deploy-page/SecretsStep'
import { PENDING } from 'constants/progress-statuses'
import useNotice from 'hooks/useNotice'

const formatSecrets = secrets => secrets ? ({
  requiredSecrets: secrets.filter(secret => secret.required),
  optionalSecrets: secrets.filter(secret => !secret.required)
}) : ({})

const getSubmitErrors = (formData, data) => {
  const secrets = data.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})

  const errors = Object.keys(formData).reduce((acc, key) => ({
    ...acc,
    ...((secrets[key].json && !isValidJsonObject(formData[key] || "")) ? { [key]: 'Invalid JSON Object' } : {})
  }), {})
  return Object.keys(errors).length > 0 ? errors : false
}

const EnhancedSecretsStep = ({
  updateActionStates,
  updateProvisioningStatus,
  stepData,
  ...props
}) => {
  const { errorNotice, infoNotice } = useNotice()
  const { data, loading, error } = useGetSecrets()
  const { requiredSecrets, optionalSecrets } = formatSecrets(data)

  const [formData, setFormData] = useState({})
  const [formErrors, setFormErrors] = useState({})

  // Check if next button is disabled
  const isNextDisabled = useMemo(() => data ? requiredSecrets.some(secret => secret.required && (formData[secret.id] === '' || formData[secret.id] === undefined)) : true, [data, formData])

  // console.log({ data, requiredSecrets, optionalSecrets, isNextDisabled })

  // update formdata with previously set secrets & next button if applicable
  useEffect(() => {
    setFormData(stepData ? stepData : {})
    !isNextDisabled && updateActionStates(states => ({ ...states, next: { ...states.next, disabled: false } }))
  }, [data])

  // update next button on form change if necessary
  useEffect(() => updateActionStates(states => ({ ...states, next: { ...states.next, disabled: isNextDisabled } })), [formData])


  const onChange = event => setFormData(formData => ({ ...formData, [event.target.name]: event.target.value }))

  const onSubmit = () => {
    const errors = getSubmitErrors(formData, data)
    if (errors) {
      setFormErrors(errors)
      return { successful: false }
    }
    setFormErrors({})

    return fetch('http://127.0.0.1:8080/bundle/deploy', {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify({
        action: 'provision',
        secrets: formData
      })
    })
      .then(res => res.json())
      .then(data => {
        infoNotice("Started Deployment.", {
          preventDuplicate: true,
          autoHideDuration: 5000,
          disableWindowBlurListener: true
        })
        updateProvisioningStatus({ status: PENDING, action: 'provision', containerId: data?.containerID })
      })
      .catch(err => {
        errorNotice("There was an issue starting the deployment.", {
          preventDuplicate: true,
          autoHideDuration: 5000,
          disableWindowBlurListener: true
        })
        errorNotice(err.toString())
        return { successful: false }
      })
  }

  return (
    <SecretsStep
      loading={loading}
      error={error}
      requiredSecrets={requiredSecrets}
      optionalSecrets={optionalSecrets}
      formData={formData}
      formErrors={formErrors}
      onChange={onChange}
      onSubmit={onSubmit}
      {...props}
    />
  )
}

export default EnhancedSecretsStep
