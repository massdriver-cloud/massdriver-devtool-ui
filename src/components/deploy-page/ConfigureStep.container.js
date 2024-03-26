import React, { useState, useEffect } from 'react'
import { NO_PRESET_SELECTED } from 'components/ConfigPanel/constants'

import ConfigureStep from 'components/deploy-page/ConfigureStep'

import {
  getPresetMenuData,
  generateHiddenUiSchemaFromPresetData
} from 'components/ConfigPanel/ConfigPanel.helpers'
import { isObjectAndEmpty, objectDeepMerge, expensiveJankyJsonCopy } from 'utils/data'
import useGetConfigureStepData from 'hooks/queries/useGetConfigureStepData'
import useNotice from 'hooks/useNotice'

// TODO: Update the form npm package to allow exporting these helper functions. 
//       Once done, replace this implementation with the one from the package.
import Ajv from 'ajv'
const sanitizeFormData = (formData, formSchema) => () => {
  const ajv = new Ajv({
    strict: false,
    validateFormats: false,
    removeAdditional: true
  })

  const dataCopy = expensiveJankyJsonCopy(formData)
  const validate = ajv.compile(formSchema)
  validate(dataCopy)
  // NOTE: Would be awesome to handle validation errors at this point somehow
  // and surface the errors in the form
  return dataCopy
}

const EnhancedConfigureStep = ({
  stepData,
  data,
  next,
  ...props
}) => {
  const { errorNotice } = useNotice()

  const [formData, setFormData] = useState()
  const [uiSchema, setUiSchema] = useState({})
  const [selectedPreset, setSelectedPreset] = useState(NO_PRESET_SELECTED)
  const [isExpandedView, setIsExpandedView] = useState(true)

  const {
    schema = {},
    uiSchema: initialUiSchema = {},
    initialFormData = {},
    loading,
    error
  } = useGetConfigureStepData()

  const initialParams = stepData || initialFormData

  const filteredPresets = schema?.examples?.filter(
    example => example?.__name?.toLowerCase() !== 'wizard'
  )
  const presetsMenuData = getPresetMenuData(filteredPresets)

  const setInitialStates = (initialParams, schema, initialUiSchema) => {
    setFormData(sanitizeFormData(initialParams, schema))
    setSelectedPreset(NO_PRESET_SELECTED)
    setIsExpandedView(true)
    setUiSchema(initialUiSchema)
  }

  useEffect(() => {
    // If everything has loaded, set the initial state
    initialParams &&
      schema &&
      setInitialStates(initialParams, schema, initialUiSchema)
  }, [initialUiSchema, schema])

  const onConfigOptionClick = event => {
    if (event.currentTarget.id === 'expand-option') {
      updateUiSchema(filteredPresets[selectedPreset], schema)
      return
    }

    const preset = filteredPresets[event.currentTarget.value]
    setFormData(preset || {})
    setSelectedPreset(event.currentTarget.value)
    if (event.currentTarget.value === NO_PRESET_SELECTED) {
      setIsExpandedView(true)
      setUiSchema(initialUiSchema)
    }
  }

  const updateUiSchema = (preset, schema) => {
    const hiddenUiSchema = generateHiddenUiSchemaFromPresetData(preset, schema)
    setUiSchema(
      isExpandedView
        ? objectDeepMerge(initialUiSchema, hiddenUiSchema)
        : initialUiSchema
    )

    setIsExpandedView(isExpandedView => !isExpandedView)
  }

  const onFormDataChange = ({ formData: newFormData }) =>
    setFormData(newFormData)

  const submitForm = () => {
    fetch('http://127.0.0.1:8080/bundle/params', {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => next(formData))
      .catch(err => {
        errorNotice("There was an issue saving your params.", {
          preventDuplicate: true,
          autoHideDuration: 5000,
          disableWindowBlurListener: true
        })
        errorNotice(err.toString())
      })
  }

  return (
    <ConfigureStep
      loading={loading}
      error={error}
      // Form stuff
      formContext={{}}
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onFormDataChange={onFormDataChange}
      onSubmit={submitForm}
      // Options menu stuff
      selectedPreset={selectedPreset}
      isExpandedView={isExpandedView}
      presetOptions={presetsMenuData}
      onConfigOptionClick={onConfigOptionClick}
      shouldShowPresets={Boolean(
        presetsMenuData && isObjectAndEmpty(initialParams)
      )}
      hasStaleParams={false}
      showMenu={presetsMenuData?.length > 0}
      {...props}
    />
  )
}

export default EnhancedConfigureStep
