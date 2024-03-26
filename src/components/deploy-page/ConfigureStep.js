import stylin from 'utils/stylin'

import ConfigPanel from 'components/ConfigPanel/ConfigPanel'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ConfigureStep = ({
  loading,
  error,
  children,
  // Form stuff
  formContext,
  formData,
  schema,
  uiSchema,
  onFormDataChange,
  onSubmit,
  // Options menu stuff
  selectedPreset,
  isExpandedView,
  presetOptions,
  onConfigOptionClick,
  shouldShowPresets,
  hasStaleParams,
  showMenu,
}) => (
  <Container>
    {loading ? (
      <EmptyMessage>Loading...</EmptyMessage>
    ) : error ? (
      <EmptyMessage>Error: There was an issue parsing your configuration form.</EmptyMessage>
    ) : (
      <>
        <Column>
          <Header>
            <Title>Configure bundle</Title>
            <Description>
              The bundles' current configuration form. Use the <strong>Config options</strong> menu to access the bundle presets. Fill in all of the required fields to deploy.
            </Description>
          </Header>
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
            {children({ back: () => ({ successful: true, data: formData }) })}
          </ConfigPanel>
        </Column>
      </>
    )}
  </Container>
)

export default ConfigureStep

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  pt: '6px'
})
const Column = stylin(Box, ['gap'])(({ gap }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: gap || '20px',
}))

const Header = stylin(Box)({

})

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
}))

const Title = stylin(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.grey[900]
}))

const Description = stylin(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.grey[700]
}))
