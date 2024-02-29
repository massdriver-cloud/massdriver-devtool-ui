import React from 'react'
import PropTypes from 'prop-types'
import stylin from '../../utils/stylin'
import PresetsBar from './PresetsBar'
import { isObjectAndEmpty } from '../../utils/data'
import Form from '../Form'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

const ConfigureForm = ({
  schema,
  uiSchema,
  formData = {},
  onFormDataChange,
  onSubmit,
  selectedPreset,
  onPresetChange,
  presetsMenuData,
  shouldShowPresets = true,
  allFieldsToggled,
  onToggleAllFieldsChange,
  formContext,
  submitButton: SubmitButton
}) => (
  <Container>
    {shouldShowPresets && (
      <PresetsContainer>
        <PresetsBar
          value={selectedPreset}
          onChange={onPresetChange}
          presetsMenuData={presetsMenuData}
          allFieldsToggled={allFieldsToggled}
          onToggleAllFieldsChange={onToggleAllFieldsChange}
        />
      </PresetsContainer>
    )}
    {isObjectAndEmpty(formData) &&
      shouldShowPresets &&
      !allFieldsToggled ? (
      <Prompt>
        Select a preset or click 'Show Advanced Fields' to begin.
      </Prompt>
    ) : (
      <>
        {!allFieldsToggled && shouldShowPresets && (
          <HidingFieldWarning severity='info'>
            <WarningHeader>
              Massdriver is hiding all fields that were auto-filled by the
              selected presets.
            </WarningHeader>
            <WarningSubHeader variant='subtitle2'>
              Click 'Show Advanced Fields' to see everything.
            </WarningSubHeader>
          </HidingFieldWarning>
        )}
        <StyledForm
          schema={schema}
          formData={formData}
          formContext={formContext}
          onChange={onFormDataChange}
          onSubmit={onSubmit}
          uiSchema={uiSchema}
        >
          {SubmitButton ? SubmitButton : (
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: '20px' }}
            >
              Validate
            </Button>
          )}
        </StyledForm>
      </>
    )}
  </Container>
)

ConfigureForm.propTypes = {
  schema: PropTypes.object,
  uiSchema: PropTypes.object,
  formData: PropTypes.object,
  submitForm: PropTypes.func,
  selectedPreset: PropTypes.string,
  onPresetChange: PropTypes.func,
  presetsMenuData: PropTypes.array,
  shouldShowPresets: PropTypes.bool
}

export default ConfigureForm

const Container = stylin(Box)({ backgroundColor: 'white', minHeight: '200px', pb: '30px' })

const PresetsContainer = stylin(Box)({
  backgroundColor: '#f5f5fa',
  p: '15px 15px',
  borderBottom: 'solid 1px #d0d2e1'
})

const HidingFieldWarning = stylin(Alert)({
  mt: '20px',
  mx: '10%'
})

const WarningHeader = stylin(Typography)({
  fontSize: '15px',
  fontWeight: 'bold'
})

const WarningSubHeader = stylin(Typography)({
  fontSize: '14px',
  lineHeight: '1rem'
})

const Prompt = stylin(Typography)({
  mt: '40px',
  textAlign: 'center',
  fontSize: '20px',
  fontWeight: 'bold'
})

const StyledForm = stylin(Form)({
  pt: '20px',
  '.MuiCheckbox-colorSecondary.Mui-checked': {
    color: '#3c3c3c'
  },
  px: '10%'
})
