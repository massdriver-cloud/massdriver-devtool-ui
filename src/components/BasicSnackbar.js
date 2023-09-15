import { forwardRef } from 'react'
import { useSnackbar } from 'notistack'
import stylin from '../utils/stylin'

import MuiAlert from '@mui/material/Alert'

const BasicSnackbar = forwardRef(
  (
    {
      style, // Must forward
      variant,
      hideIconVariant = false,
      message,
      id
    },
    ref
  ) => {
    const { closeSnackbar } = useSnackbar()

    return (
      <Alert
        id={id}
        elevation={6}
        severity={variant}
        variant='filled'
        onClose={() => closeSnackbar(id)}
        ref={ref}
        {...(hideIconVariant ? { icon: false } : {})}
        style={style}
      >
        {message}
      </Alert>
    )
  }
)

export default BasicSnackbar

const Alert = stylin(MuiAlert)({
  color: 'white',
  '.MuiAlert-action': {
    color: 'rgba(255, 255, 255, 0.85)'
  }
})
