import React, { useState, useEffect } from 'react'
import {
  NO_PRESET_SELECTED,
} from 'components/ConfigPanel/constants'

import ValidateForm from 'components/FormSection/ValidateForm'
import {
  getPresetMenuData,
  generateHiddenUiSchemaFromPresetData
} from 'components/ConfigPanel/ConfigPanel.helpers'
import { isObjectAndEmpty, objectDeepMerge, expensiveJankyJsonCopy } from 'utils/data'
import useGetFormSchemas from 'hooks/queries/useGetFormSchemas'
import useNotice from 'hooks/useNotice'

// TODO: Update the form npm package to allow exporting these helper functions. 
//       Once done, replace this implementation with the one from the package.
import Ajv from 'ajv'
const sanitizeFormData = (formData, formSchema) => {
  try {
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
  catch (error) {
    return error?.toString()
  }
}

const EnhancedValidateForm = ({ updateDisplayFormData }) => {
  const { successNotice } = useNotice()

  const [formData, setFormData] = useState()
  const [uiSchema, setUiSchema] = useState({})
  const [selectedPreset, setSelectedPreset] = useState(NO_PRESET_SELECTED)
  const [isExpandedView, setIsExpandedView] = useState(true)

  // Error handling for bad schema
  const [schemaError, setSchemaError] = useState()

  const {
    schema = {},
    uiSchema: initialUiSchema = {},
    loading,
    error
  } = useGetFormSchemas()

  const initialParams = {}

  const filteredPresets = schema?.examples?.filter(
    example => example?.__name?.toLowerCase() !== 'wizard'
  )
  const presetsMenuData = getPresetMenuData(filteredPresets)

  const setInitialStates = (initialParams, schema, initialUiSchema) => {
    const response = sanitizeFormData(initialParams, schema)
    if (typeof response === 'string') {
      setSchemaError(response)
      return
    }
    setFormData(response)
    updateDisplayFormData(response)
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
    updateDisplayFormData(preset || {})
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

  const onFormDataChange = ({ formData: newFormData }) => {
    setFormData(newFormData)
    updateDisplayFormData(newFormData)
  }

  const submitForm = () => successNotice('Input passed form validation.', {
    preventDuplicate: true,
    autoHideDuration: 5000,
    disableWindowBlurListener: true
  })

  return (
    <ValidateForm
      loading={loading}
      error={error}
      schemaError={schemaError}
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
    />
  )
}

export default EnhancedValidateForm
