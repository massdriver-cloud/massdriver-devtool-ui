import { useState, useEffect } from 'react'
import stylin from 'utils/stylin'
import { isObjectAndEmpty, objectDeepMerge, expensiveJankyJsonCopy } from 'utils/data'

import ConfigPanel from 'components/ConfigPanel/ConfigPanel'
import LoadingSpinner from 'components/LoadingSpinner'
import Custom404 from 'components/Custom404'
import {
  getPresetMenuData,
  generateHiddenUiSchemaFromPresetData
} from 'components/ConfigPanel/ConfigPanel.helpers'
import {
  NO_PRESET_SELECTED,
} from 'components/ConfigPanel/constants'

import useGetFormSchemas from 'hooks/queries/useGetFormSchemas'
import useNotice from 'hooks/useNotice'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'

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


const EnhancedFormStep = ({ currentSlideIndex, back, next, data }) => {
  const { errorNotice, infoNotice } = useNotice()
  const [selectedPreset, setSelectedPreset] = useState(NO_PRESET_SELECTED)
  const [isExpandedView, setIsExpandedView] = useState(true)
  const [formData, setFormData] = useState({})
  const [uiSchema, setUiSchema] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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

  const onSubmit = () => {
    setIsLoading(true)

    fetch('http://127.0.0.1:8080/bundle/deploy', {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify({
        action: 'provision',
        params: formData,
      })
    })
      .then(res => res.json())
      .then(data => {
        infoNotice("Started Deployment.", {
          preventDuplicate: true,
          autoHideDuration: 5000,
          disableWindowBlurListener: true
        })
        next({ containerId: data?.containerID, action: 'provision' })
      })
      .catch(err => {
        console.log(err)
        errorNotice("There was an issue starting the deployment.", {
          preventDuplicate: true,
          autoHideDuration: 5000,
          disableWindowBlurListener: true
        })
      })
      .finally(() => setIsLoading(false))
  }

  const onBack = () => back({ ...data?.secretsData })

  return (
    <Container>
      {
        loading ? (
          <LoadingSpinner />
        ) : error ? (
          <Custom404 small>
            <Typography variant='h3'>
              Bundle Schemas not found
            </Typography>
            <Typography variant='h6'>
              We encountered an issue parsing your bundle schemas. Please restart the dev server and try again.
            </Typography>
          </Custom404>
        ) : schema && initialUiSchema && (
          <ConfigPanel
            // Form stuff
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onFormDataChange={onFormDataChange}
            onSubmit={onSubmit}
            // Options menu stuff
            selectedPreset={selectedPreset}
            isExpandedView={isExpandedView}
            presetOptions={presetsMenuData}
            onConfigOptionClick={onConfigOptionClick}
            shouldShowPresets={Boolean(
              presetsMenuData && isObjectAndEmpty(initialParams)
            )}
            hasStaleParams={false}
          >
            <NavContainer currentSlideIndex={currentSlideIndex}>
              {currentSlideIndex === 0 ? (
                <DeployButton
                  fullWidth
                  variant="contained"
                  loading={isLoading}
                  type="submit"
                >
                  Deploy
                </DeployButton>
              ) : (
                <>
                  <BackButton
                    onClick={onBack}
                    variant="contained"
                  >
                    Back
                  </BackButton>
                  <DeployButton
                    variant="contained"
                    loading={isLoading}
                    type="submit"
                  >
                    Deploy
                  </DeployButton>
                </>
              )}
            </NavContainer>
          </ConfigPanel>
        )
      }
    </Container>
  )
}

export default EnhancedFormStep

const BackButton = stylin(Button)({
  mx: 0
})

const DeployButton = stylin(LoadingButton)({
  mx: 0
})

const NavContainer = stylin(Box, ['currentSlideIndex'])(({ currentSlideIndex }) => ({
  display: 'flex',
  pt: '30px',
  alignItems: 'center',
  justifyContent: currentSlideIndex === 0 ? 'center' : 'space-between'
}))

const Container = stylin(Box)({
  p: '26px'
})
