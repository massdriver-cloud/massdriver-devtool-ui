import stylin from 'utils/stylin'

import { INITIALIZED, PENDING, RUNNING, COMPLETED, FAILED } from 'constants/progress-statuses'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

const getText = (isCancelled, status, countdown, containerName) =>
  status === INITIALIZED ?
    isCancelled ?
      'Bundle is not decommissioned. Please decommission before leaving the page.'
      :
      `Decommissioning bundle in ${countdown} seconds...`
    : status === PENDING ?
      'Decommissioning pending...'
      : status === RUNNING ?
        'Decommissioning running...'
        : status === COMPLETED ?
          'Decommissioning successful.'
          : status === FAILED ?
            `Decommissioning failed. Check docker container '${containerName}' for more information.`
            : ''

const SEVERITY_MAP = {
  [INITIALIZED]: 'info',
  [PENDING]: 'info',
  [RUNNING]: 'info',
  [COMPLETED]: 'success',
  [FAILED]: 'error'
}

const AutoDecommissionBar = ({
  containerName,
  countdown,
  isCancelled,
  status,
  onCancelClick,
  onDecommissionClick,
  onBackClick
}) => {
  const text = getText(isCancelled, status, countdown, containerName)

  return (
    <StyledAlert
      variant="filled"
      severity={(status === INITIALIZED && isCancelled) ? 'warning' : SEVERITY_MAP[status]}
      action={
        ([INITIALIZED, COMPLETED, FAILED].includes(status)) && (
          <StyledButton
            variant="outlined"
            onClick={
              status === INITIALIZED ?
                isCancelled ?
                  onDecommissionClick :
                  onCancelClick :
                onBackClick
            }
          >
            {
              status === INITIALIZED ?
                isCancelled ?
                  'Decommission' :
                  'Cancel' :
                'Back to App'
            }
          </StyledButton>
        )
      }
    >
      {text}
    </StyledAlert>
  )
}

export default AutoDecommissionBar

const StyledAlert = stylin(Alert)({
  borderRadius: '0px',
  color: '#fff',
  'svg': {
    height: '34px',
    width: '34px',
  },
  '.MuiAlert-message': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px'
  },
  '.MuiAlert-action': {
    p: 0,
    alignItems: 'center'
  }
})

const StyledButton = stylin(Button)({
  borderRadius: '0px',
  fontWeight: 'normal',
  color: '#fff',
  borderColor: '#fff',
  mr: '10px',
})
