import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import useNotice from 'hooks/useNotice'
import { useApp } from 'contexts/appContext'
import {
  NO_PRESET_SELECTED,
  SAVE_PACKAGE,
  DEPLOY_PACKAGE
} from 'components/ConfigPanel/constants'

import ResourceProgressViewer from 'components/ResourceProgressViewer/ResourceProgressViewer.container'
import ConfigPanel from 'components/ConfigPanel/ConfigPanel'
import {
  getPresetMenuData,
  generateHiddenUiSchemaFromPresetData
} from 'components/ConfigPanel/ConfigPanel.helpers'
import { parseJson, isObjectAndEmpty, objectDeepMerge } from 'utils/data'
import { sanitizeFormData } from 'components/Form/form-helpers'

import useCheckHasDefaultTargetCredential from 'hooks/queries/useCheckHasDefaultTargetCredential'
import useGetPackageParams from 'hooks/queries/useGetPackageParams'
import useConfigurePackage from 'hooks/mutations/useConfigurePackage'
import useDeployPackage from 'hooks/mutations/useDeployPackage'

const EnhancedConfigPanel = ({ packageId, alwaysShowMenu }) => {
  const [formData, setFormData] = useState()
  const [isSaveLoading, setIsSaveLoading] = useState(false)
  const [isDeployLoading, setIsDeployLoading] = useState(false)
  const [uiSchema, setUiSchema] = useState({})
  const [selectedPreset, setSelectedPreset] = useState(NO_PRESET_SELECTED)
  const [isExpandedView, setIsExpandedView] = useState(true)

  const { data, loading, error } = useGetPackageParams({ id: packageId })
  const { result: hasDefaultTargetCredential } =
    useCheckHasDefaultTargetCredential({ id: data?.package?.target?.id })
  const manifestId = data?.package?.manifest?.id
  const targetId = data?.package?.target?.id

  const { parsedJson: parsedSchema } = useMemo(
    () => parseJson(data?.package?.paramsSchema),
    [data]
  )
  const initialUiSchema = data?.package?.manifest?.bundle?.uiSchema || {}

  const filteredPresets = parsedSchema?.examples?.filter(
    example => example?.__name?.toLowerCase() !== 'wizard'
  )
  const presetsMenuData = getPresetMenuData(filteredPresets)

  const setInitialStates = (pkg, schema, initialUiSchema) => {
    setFormData(sanitizeFormData(pkg?.params, schema))
    setSelectedPreset(NO_PRESET_SELECTED)
    setIsExpandedView(true)
    setUiSchema(initialUiSchema)
  }

  useEffect(() => {
    // If everything has loaded, set the initial state
    data?.package &&
      parsedSchema &&
      setInitialStates(data?.package, parsedSchema, initialUiSchema)
  }, [data, parsedSchema])

  const onConfigOptionClick = event => {
    if (event.currentTarget.id === 'expand-option') {
      updateUiSchema(filteredPresets[selectedPreset], parsedSchema)
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

  const [configurePackage] = useConfigurePackage(['getPackageParams'])
  const [deployPackage] = useDeployPackage()
  const { errorNotice, infoNotice } = useNotice()
  const { interact } = useApp()

  const submitForm = ({ formData: newFormData }, event) => {
    const submitter = event.nativeEvent.submitter.className.includes(
      DEPLOY_PACKAGE
    )
      ? DEPLOY_PACKAGE
      : SAVE_PACKAGE

    submitter === SAVE_PACKAGE
      ? setIsSaveLoading(true)
      : setIsDeployLoading(true)

    const params = JSON.stringify(newFormData || {})

    configurePackage({ id: packageId, params })
      .then(({ data }) => {
        if (!data.configurePackage.successful) {
          data.configurePackage.messages.forEach(msg =>
            errorNotice(msg.message)
          )
          return
        }
        setFormData(data.configurePackage.result.params)
        infoNotice('Configuration saved!')
      })
      .then(() => submitter === DEPLOY_PACKAGE && enqueueDeployment())
      .finally(() => setIsSaveLoading(false))
  }

  const enqueueDeployment = () =>
    deployPackage({ id: packageId })
      .then(({ data }) => {
        if (!data.deployPackage.successful) {
          data.deployPackage.messages.forEach(msg => errorNotice(msg.message))
          return
        }
        infoNotice('Deployment enqueued!')
        interact.contextDrawer.open({
          props: {
            manifestId,
            targetId,
            packageId: data.deployPackage.result.package.id
          },
          component: ResourceProgressViewer
        })
      })
      .finally(() => setIsDeployLoading(false))

  return (
    <ConfigPanel
      loading={loading}
      error={error}
      // Form stuff
      formContext={{
        hasDeployed: data?.package?.deployments?.length > 0,
        manifestId,
        targetId,
        packageId
      }}
      schema={parsedSchema}
      uiSchema={uiSchema}
      formData={formData}
      onFormDataChange={onFormDataChange}
      onSubmit={submitForm}
      hasDefaultTargetCredential={hasDefaultTargetCredential}
      isSaveLoading={isSaveLoading}
      isDeployLoading={isDeployLoading}
      // Options menu stuff
      selectedPreset={selectedPreset}
      isExpandedView={isExpandedView}
      presetOptions={presetsMenuData}
      onConfigOptionClick={onConfigOptionClick}
      shouldShowPresets={Boolean(
        presetsMenuData && isObjectAndEmpty(data?.package?.params)
      )}
      alwaysShowMenu={alwaysShowMenu}
    />
  )
}

EnhancedConfigPanel.propTypes = {
  packageId: PropTypes.string
}

export default EnhancedConfigPanel
