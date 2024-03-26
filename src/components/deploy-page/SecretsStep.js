import stylin from 'utils/stylin'


import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

const SecretsStep = ({
  loading,
  error,
  requiredSecrets = [],
  optionalSecrets = [],
  formData = {},
  formErrors,
  onChange,
  onSubmit,
  children
}) => (
  <Container>
    {loading ? (
      <EmptyMessage>Loading...</EmptyMessage>
    ) : error ? (
      <EmptyMessage>Error: There was an issue parsing your secrets.</EmptyMessage>
    ) : (
      <>
        <Column>
          <Header>
            <Title>Required secrets</Title>
            <Description>
              These secrets are required to successfully deploy the bundle.
            </Description>
          </Header>
          <Column gap='18px'>
            {requiredSecrets.length > 0 ? requiredSecrets.map(({ id, name, title, description, required, json, }) => (
              <FieldContainer key={id}>
                <SecretField
                  name={name}
                  value={formData[id] || ''}
                  label={title || name}
                  helperText={formErrors[id] || ""}
                  error={formErrors[id]}
                  onChange={onChange}
                  fullWidth
                  required={required}
                  {...(json ? {
                    multiline: true,
                    rows: 4
                  } : {})}
                />
                <FieldDescription>{description || ""}</FieldDescription>
              </FieldContainer>
            )) : (
              <EmptyMessage>This bundle has no required secrets...</EmptyMessage>
            )}
          </Column>
        </Column>
        <Column>
          <Header>
            <Title>Optional secrets</Title>
            <Description>
              These secrets are optional and <strong>not</strong> required to successfully deploy the bundle.
            </Description>
          </Header>
          <Column gap='18px'>
            {optionalSecrets.length > 0 ? optionalSecrets.map(({ id, name, title, description, required, json, }) => (
              <FieldContainer key={id}>
                <SecretField
                  name={name}
                  value={formData[id] || ''}
                  label={title || name}
                  helperText={formErrors[id] || ""}
                  error={formErrors[id]}
                  onChange={onChange}
                  fullWidth
                  required={required}
                  {...(json ? {
                    multiline: true,
                    rows: 4
                  } : {})}
                />
                <FieldDescription>{description || ""}</FieldDescription>
              </FieldContainer>
            )) : (
              <EmptyMessage>This bundle has no optional secrets...</EmptyMessage>
            )}
          </Column>
        </Column>
        {children({ next: onSubmit, back: () => ({ successful: true, data: formData }) })}
      </>
    )}
  </Container>
)

export default SecretsStep

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  pt: '6px'
})
const Column = stylin(Box, ['gap'])(({ gap }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: gap || '16px',
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

const FieldContainer = stylin(Box)({
  width: '100%'
})

const SecretField = stylin(TextField)(({ theme }) => ({
  '.MuiInputBase-root': {
    borderRadius: '4px'
  }
}))

const FieldDescription = stylin(Typography)(({ theme }) => ({
  fontWeight: 'normal',
  fontSize: '13px',
  color: theme.palette.grey[700],
  ml: '8px'
}))
