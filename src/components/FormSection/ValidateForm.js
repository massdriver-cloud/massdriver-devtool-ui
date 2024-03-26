import stylin from 'utils/stylin'

import ConfigPanel from 'components/ConfigPanel/ConfigPanel'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const FormSection = ({
  loading,
  error,
  schemaError,
  // Form stuff
  formContext = {},
  schema,
  uiSchema,
  formData = {},
  onFormDataChange,
  onSubmit,
  // Options menu stuff
  selectedPreset,
  isExpandedView,
  presetOptions,
  onConfigOptionClick,
  shouldShowPresets = true,
  hasStaleParams,
  showMenu,
}) => (
  loading ? (
    <EmptyMessage>Loading...</EmptyMessage>
  ) : (schemaError || error) ? (
    <EmptyMessage>Error: There was an issue parsing your bundle params schema.</EmptyMessage>
  ) : (
    <ConfigPanel
      showMenu={showMenu}
      // Form stuff
      formContext={formContext}
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onFormDataChange={onFormDataChange}
      onSubmit={onSubmit}
      // Options menu stuff
      selectedPreset={selectedPreset}
      isExpandedView={isExpandedView}
      presetOptions={presetOptions}
      onConfigOptionClick={onConfigOptionClick}
      shouldShowPresets={shouldShowPresets}
      hasStaleParams={hasStaleParams}
    >
      <Button
        type="submit"
        variant="outlined"
      >
        Validate
      </Button>
    </ConfigPanel>
  )
)

export default FormSection

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '10px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
}))
