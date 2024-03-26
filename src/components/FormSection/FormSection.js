import stylin from 'utils/stylin'

import Section from 'components/Section'
import ConfigPanel from 'components/ConfigPanel/ConfigPanel'
import CodeBlock from 'components/CodeBlock'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

const SECTION_TITLE = "Bundle configuration form validator"

const FORM_TITLE = "Form"
const FORM_DESCRIPTION = "The bundles' current configuration form. Use the 'Config options' menu to test bundle presets. Click the 'Validate' button to test form validation."

const FORMDATA_TITLE = "Form data"
const FORMDATA_DESCRIPTION = "The current form data. Edit the form and then check here to see how the data object looks."

const FormSection = ({
  loading,
  error,
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
  <Section
    title={SECTION_TITLE}
    description={<>The configuration form that is generated by the <strong>params</strong> in the <strong>massdriver.yaml</strong>. Use this tool to validate the form and ensure it is generated properly.</>}
  >
    <Container>
      {
        loading ? (
          <EmptyMessage>Loading...</EmptyMessage>
        ) : error ? (
          <EmptyMessage>Error: There was an issue parsing your bundle params.</EmptyMessage>
        ) :
          <Stack
            direction={{
              xs: 'column-reverse',
              md: 'row'
            }}
          >
            <Panel>
              <Header>
                <Title>{FORM_TITLE}</Title>
                <Description>{FORM_DESCRIPTION}</Description>
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
                <Button
                  type="submit"
                  variant="outlined"
                >
                  Validate
                </Button>
              </ConfigPanel>
            </Panel>
            <Divider orientation="vertical" />
            <Panel>
              <Header>
                <Title>{FORMDATA_TITLE}</Title>
                <Description>{FORMDATA_DESCRIPTION}</Description>
              </Header>
              <CodeBlock
                copy
                data={formData}
                sx={{ fontSize: '12px' }}
              />
            </Panel>
          </Stack>
      }
    </Container>
  </Section>
)

export default FormSection

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
})

const Panel = stylin(Box)({
  width: {
    xs: '100%',
    md: '50%',
  },
  p: '16px'
})

const Header = stylin(Box)({
  mb: '16px'
})

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '10px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
}))

const Title = stylin(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.grey[900],
  fontWeight: 500,
  lineHeight: '16px'
}))

const Description = stylin(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.grey[700],
  lineHeight: '14px'
}))
