import stylin from '../../utils/stylin'
import FormsMarkdown from '../markdown/FormsMarkdown'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'

const SecretsLineItem = ({
  hasErrors,
  title,
  required,
  value,
  onChange,
  isJson,
  description,
  formErrors,
  id
}) => (
  <Box>
    <SecretTitle error={hasErrors}>
      {`${title}${required ? '*' : ''}`}
    </SecretTitle>
    <TextLine
      direction='row'
      spacing={2}
      sx={{
        mt: '14px'
      }}
    >
      {' '}
      <SecretTextField
        id={id}
        className='ph-no-capture'
        size='small'
        fullWidth
        error={hasErrors}
        value={value}
        onChange={onChange}
        autoComplete='off'
        {...(isJson
          ? {
            multiline: true,
            minRows: 4
          }
          : {})}
      />
    </TextLine>
    <SecretDescription variant='subtitle2'>
      <FormsMarkdown>{description}</FormsMarkdown>
    </SecretDescription>
    {hasErrors && <SecretError>{formErrors?.join('\n')}</SecretError>}
    <SecretsDivider />
  </Box>
)

export default SecretsLineItem

const SecretTitle = stylin(Typography, ['error'])(({ error }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: error ? 'error.main' : ''
}))

const SecretDescription = stylin(Typography)({
  fontSize: '12px',
  width: `calc(100% - 78px)`
})

const SecretError = stylin(Typography)({
  mt: '6px',
  fontSize: '13px',
  fontWeight: 'bold',
  width: `calc(100% - 78px)`,
  color: 'error.main',
  whiteSpace: 'pre-line'
})

const SecretsDivider = stylin(Divider)({
  mt: '16px',
  mb: '16px'
})

const TextLine = stylin(Stack)({
  alignItems: 'start',
  justifyContent: 'space-between',
  flexDirection: 'row'
})

const SaveButton = stylin(LoadingButton)({
  '&.MuiLoadingButton-loading': {
    border: theme => `1px solid ${theme.palette.primary.light}`,
    backgroundColor: `rgba(0, 0, 0, 0.1)`
  }
})

const SecretTextField = stylin(TextField)(({ disabled }) => ({
  mb: '6px',
  ...(disabled
    ? {
      '& .MuiInputBase-input': {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }
    : {})
}))
