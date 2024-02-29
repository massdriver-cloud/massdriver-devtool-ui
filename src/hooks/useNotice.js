/**
 * A proxy for the notice delivery. Helpful for setting some defaults for
 * specific types of notices, and extra things like passing an array of
 * messages.
 */
import { useCallback } from 'react'
import { useSnackbar } from 'notistack'

const INFO_OPTIONS = {
  variant: 'info',
  preventDuplicate: true,
  autoHideDuration: 2000,
  disableWindowBlurListener: true
}

const SUCCESS_OPTIONS = {
  variant: 'success',
  preventDuplicate: true,
  autoHideDuration: 2000,
  disableWindowBlurListener: true
}

const ERROR_OPTIONS = {
  variant: 'error',
  preventDuplicate: true,
  autoHideDuration: 4000,
  disableWindowBlurListener: true
}

const useNotice = () => {
  const { enqueueSnackbar } = useSnackbar()

  const infoNotice = useCallback(
    (messages, { variant, ...options } = {}) =>
      Array.isArray(messages)
        ? messages.forEach(message =>
          enqueueSnackbar(message, {
            ...INFO_OPTIONS,
            ...(options || {})
          })
        )
        : enqueueSnackbar(messages, {
          ...INFO_OPTIONS,
          ...(options || {})
        }),
    []
  )

  const successNotice = useCallback(
    (messages, { variant, ...options } = {}) =>
      Array.isArray(messages)
        ? messages.forEach(message =>
          enqueueSnackbar(message, {
            ...SUCCESS_OPTIONS,
            ...(options || {})
          })
        )
        : enqueueSnackbar(messages, {
          ...SUCCESS_OPTIONS,
          ...(options || {})
        }),
    []
  )

  const errorNotice = useCallback(
    (messages, { variant, ...options } = {}) =>
      Array.isArray(messages)
        ? messages.forEach(message =>
          enqueueSnackbar(message, {
            ...ERROR_OPTIONS,
            ...(options || {})
          })
        )
        : enqueueSnackbar(messages, {
          ...ERROR_OPTIONS,
          ...(options || {})
        }),
    []
  )

  return { infoNotice, successNotice, errorNotice }
}

export default useNotice
