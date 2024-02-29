import React from 'react'
import PropTypes from 'prop-types'
import stylin from 'utils/stylin'
import LoadingSpinner from 'components/LoadingSpinner'
import Custom404 from 'components/Custom404'
import ConfigOptionsMenu from 'components/ConfigPanel/ConfigOptionsMenu'
import AlertBanner from 'components/AlertBanner'
import ConfigureManifestForm from 'components/all-forms/ConfigureManifestForm'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ConfigPanel = ({
  loading,
  error,
  children,
  // Form stuff
  formContext = {},
  schema,
  uiSchema,
  formData = {},
  onFormDataChange,
  submitForm,
  // Options menu stuff
  selectedPreset,
  isExpandedView,
  presetOptions,
  onConfigOptionClick,
  shouldShowPresets = true,
  hasStaleParams
}) => (
  <Box>
    {loading ? (
      <LoadingSpinner />
    ) : error ? (
      <Custom404 small>
        <Typography variant='h3'>Package not found</Typography>
        <Typography variant='h6'>
          We encountered a problem when grabbing some package data.
          Please re-open the drawer to retry.
        </Typography>
      </Custom404>
    ) : (
      <>
        {shouldShowPresets && (
          <ConfigOptionsMenu
            presetOptions={presetOptions}
            selectedPreset={selectedPreset}
            isExpandedView={isExpandedView}
            onClick={onConfigOptionClick}
            sx={{ mb: isExpandedView && !hasStaleParams ? '12px' : '0px' }}
          />
        )}
        {hasStaleParams && (
          <StyledAlertBanner
            header='Undeployed changes'
            description='There are saved changes that differ from the current deployment.'
          />
        )}
        {!isExpandedView && shouldShowPresets && (
          <StyledAlertBanner
            header='Massdriver is hiding all fields that were auto-filled by the
          selected presets.'
            description="Click 'Show data set by preset' to see everything."
          />
        )}
        <ConfigureManifestForm
          schema={schema}
          formData={formData}
          formContext={formContext}
          onChange={onFormDataChange}
          onSubmit={submitForm}
          uiSchema={uiSchema}
        >
          {children}
        </ConfigureManifestForm>
      </>
    )}
  </Box>
)

ConfigPanel.propTypes = {
  schema: PropTypes.object,
  uiSchema: PropTypes.object,
  formData: PropTypes.object,
  submitForm: PropTypes.func,
  selectedPreset: PropTypes.number,
  onPresetChange: PropTypes.func,
  presetsMenuData: PropTypes.array,
  shouldShowPresets: PropTypes.bool
}

export default ConfigPanel

const StyledAlertBanner = stylin(AlertBanner)({
  mb: '12px'
})
