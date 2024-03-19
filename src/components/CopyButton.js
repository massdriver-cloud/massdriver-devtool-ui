import { useSnackbar } from 'notistack'

import useClipboard from 'hooks/utilities/useClipboard'

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const CopyIconButton = ({ small, ...props }) => (
  <IconButton
    disableFocusRipple
    disableRipple
    {...props}
    sx={{
      ...(small && {
        width: '5px',
        height: '5px'
      }),
      '&:hover': {
        color: 'primary.main'
      },
      ...props?.sx
    }}
  >
    <ContentCopyIcon />
  </IconButton>
)

const CopyButton = ({
  tooltip,
  itemToCopy,
  snackbarText,
  snackbarOptions,
  small,
  onClick,
  children,
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar()

  const onSuccess = () => {
    enqueueSnackbar(
      snackbarText || 'Copied to clipboard.',
      snackbarOptions || {
        variant: 'info',
        preventDuplicate: true,
        autoHideDuration: 2000,
        disableWindowBlurListener: true
      }
    )
  }

  const onError = error => {
    enqueueSnackbar(error.message, {
      variant: 'error',
      preventDuplicate: true,
      autoHideDuration: 2000,
      disableWindowBlurListener: true
    })
  }
  // eslint-disable-next-line no-unused-vars
  const [_, copy] = useClipboard({
    onSuccess,
    onError
  })

  const onCopyClick = event => {
    copy(itemToCopy?.toString())
    onClick?.(event, itemToCopy?.toString())
  }

  return (
    <>
      {tooltip ? (
        <Tooltip title={tooltip}>
          <span>
            {children ? (
              <Button
                size={small ? 'small' : 'medium'}
                {...props}
                onClick={onCopyClick}
              >
                {children}
              </Button>
            ) : (
              <CopyIconButton small={small} {...props} onClick={onCopyClick} />
            )}
          </span>
        </Tooltip>
      ) : children ? (
        <Button
          size={small ? 'small' : 'medium'}
          {...props}
          onClick={onCopyClick}
        >
          {children}
        </Button>
      ) : (
        <CopyIconButton small={small} {...props} onClick={onCopyClick} />
      )}
    </>
  )
}

export default CopyButton
