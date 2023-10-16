import stylin from '../../utils/stylin'

import Tooltip from '@mui/material/Tooltip'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import FormsMarkdown from '../markdown/FormsMarkdown'

const SecretLine = ({
  title,
  description,
  required,
  isJson,
  onChange,
  onSubmit,
  onEditClick,
  onCancelEditClick,
  onEditSave,
  onConfirmClearClick,
  onClearClick,
  onClearClickAway,
  isClearConfirmationOpen,
  isEditable,
  isLoading,
  hasErrors,
  value,
  previousValue,
  formErrors
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
        className='ph-no-capture'
        size='small'
        fullWidth
        error={hasErrors}
        value={value}
        onChange={onChange}
        disabled={!isEditable}
        autoComplete='off'
        title={isEditable ? value : previousValue}
        {...(isJson && isEditable
          ? {
            multiline: true,
            minRows: 4
          }
          : {})}
      />
      {isEditable ? (
        <>
          {!!previousValue && (
            <Button variant='contained' onClick={onCancelEditClick}>
              Cancel
            </Button>
          )}
          <Tooltip
            title='Secrets are not savable here.'
          >
            <span>
              <SaveButton
                disabled
                variant='contained'
                loading={isLoading}
                onClick={!!previousValue ? onEditSave : onSubmit} // eslint-disable-line
              >
                Save
              </SaveButton>
            </span>
          </Tooltip>
        </>
      ) : (
        <>
          <Button variant='contained' onClick={onEditClick}>
            Edit
          </Button>
          <ClickAwayListener onClickAway={onClearClickAway}>
            <Box>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [-20, -2]
                      }
                    }
                  ]
                }}
                onClose={onClearClickAway}
                open={isClearConfirmationOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <TooltipContainer>
                    <TooltipHeader>
                      <Typography variant='h5'>Are you sure?</Typography>
                    </TooltipHeader>
                    <ConfirmButton
                      variant='contained'
                      loading={isLoading}
                      onClick={onConfirmClearClick}
                    >
                      Confirm
                    </ConfirmButton>
                  </TooltipContainer>
                }
                placement='top'
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: '#fff',
                      color: '#000',
                      padding: '8px 16px',
                      fontSize: 13,
                      filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.2))'
                    }
                  },
                  arrow: {
                    sx: {
                      color: '#fff'
                    }
                  }
                }}
              >
                <Button variant='contained' onClick={onClearClick}>
                  Clear
                </Button>
              </Tooltip>
            </Box>
          </ClickAwayListener>
        </>
      )}
    </TextLine>
    <SecretDescription variant='subtitle2'>
      <FormsMarkdown>{description}</FormsMarkdown>
    </SecretDescription>
    {hasErrors && <SecretError>{formErrors?.join('\n')}</SecretError>}
    <SecretsDivider />
  </Box>
)

export default SecretLine

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

const TooltipContainer = stylin(Box)({
  mx: -2,
  mt: -2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'column'
})

const TooltipHeader = stylin(Box)({
  backgroundColor: '#f5f5fa',
  p: '12px 14px',
  borderBottom: 'solid 1px #d0d2e1',
  borderRadius: '6px 6px 0px 0px',
  mb: '8px'
})

const ConfirmButton = stylin(LoadingButton)({
  mx: '12px',
  width: 'calc(100% - 24px)',
  '&.MuiLoadingButton-loading': {
    border: theme => `1px solid ${theme.palette.primary.light}`,
    backgroundColor: `rgba(0, 0, 0, 0.1)`
  }
})
