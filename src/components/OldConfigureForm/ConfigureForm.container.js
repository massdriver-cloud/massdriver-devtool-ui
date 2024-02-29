import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  isEmptyArray,
  objectDeepMerge
} from '../../utils/data'
import ConfigureForm from './ConfigureForm'
import { generateHiddenUiSchemaFromPresetData } from './helpers'
import useToggle from '../../hooks/useToggle'

const DEFAULT_PRESET_ITEM = { value: '-1', label: 'None' }

const EnhancedConfigureForm = ({
  formData,
  setFormData,
  schema,
  onSubmit,
  uiSchema: passedUiSchema,
  submitButton
}) => {
  const [uiSchema, setUiSchema] = useState({})
  const {
    isOpen: allFieldsToggled,
    open: togglePresetsFieldsVisible,
    close: togglePresetsFieldsHidden
  } = useToggle(false)

  const initialUiSchema = passedUiSchema || {}

  useEffect(() => setUiSchema(initialUiSchema), [])

  const onToggleAllFieldsChange = () => {
    const hiddenUiSchema = generateHiddenUiSchemaFromPresetData(
      presetExamples[selectedPreset],
      schema
    )
    setUiSchema(
      allFieldsToggled
        ? objectDeepMerge(initialUiSchema, hiddenUiSchema)
        : initialUiSchema
    )

    !allFieldsToggled && selectedPreset === '' && setSelectedPreset('-1')

    allFieldsToggled
      ? togglePresetsFieldsHidden()
      : togglePresetsFieldsVisible()
  }

  // Hide the wizard presets - that's only for the squirrels
  const presetExamples = (schema?.examples || []).filter(
    example => example?.__name?.toLowerCase() !== 'wizard'
  )

  const presetsMenuData = !isEmptyArray(presetExamples)
    ? [
      DEFAULT_PRESET_ITEM,
      ...presetExamples.map((preset, index) => ({
        value: index.toString(),
        label: preset.__name
      }))
    ]
    : undefined

  const [selectedPreset, setSelectedPreset] = useState('')

  const onPresetChange = event => {
    const preset = presetExamples[event.target.value]
    setFormData(preset || {})
    setSelectedPreset(event.target.value)

    const hiddenUiSchema = generateHiddenUiSchemaFromPresetData(
      preset,
      schema
    )

    setUiSchema(objectDeepMerge(initialUiSchema, hiddenUiSchema))
    event.target.value === -1
      ? togglePresetsFieldsVisible()
      : preset
        ? togglePresetsFieldsHidden()
        : togglePresetsFieldsVisible()
  }

  const onFormDataChange = ({ formData: newFormData }) =>
    setFormData(newFormData)

  return (
    <ConfigureForm
      formContext={{
        hasDeployed: false
      }}
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onFormDataChange={onFormDataChange}
      onSubmit={onSubmit}
      // preset select
      selectedPreset={selectedPreset}
      onPresetChange={onPresetChange}
      presetsMenuData={presetsMenuData}
      allFieldsToggled={allFieldsToggled}
      onToggleAllFieldsChange={onToggleAllFieldsChange}
      shouldShowPresets={Boolean(presetsMenuData)}
      submitButton={submitButton}
    />
  )
}

EnhancedConfigureForm.propTypes = {
  manifestId: PropTypes.string,
  targetId: PropTypes.string
}

export default EnhancedConfigureForm
