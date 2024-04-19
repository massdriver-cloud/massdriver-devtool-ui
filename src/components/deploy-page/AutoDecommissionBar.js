import stylin from 'utils/stylin'

import { INITIALIZED, PENDING, RUNNING, COMPLETED, FAILED } from 'constants/progress-statuses'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

const getText = (isCancelled, status, countdown, containerName) =>
  status === INITIALIZED ?
    isCancelled ?
      'Bundle is not decommissioned. Please decommission before leaving the page.'
      :
      countdown.minutes > 0 ?
        `Decommissioning bundle in ${countdown.minutes} minutes ${countdown.seconds} seconds...`
        :
        `Decommissioning bundle in ${countdown.seconds} seconds...`
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
  onAdd15MinutesClick,
  onCancelClick,
  onDecommissionClick,
  onBackClick
}) => {
  const text = getText(isCancelled, status, countdown, containerName)

  return (
    <StyledAlert
      variant="filled"
      severity={(status === INITIALIZED && isCancelled) ? 'warning' : SEVERITY_MAP[status]}
      {...([PENDING, RUNNING].includes(status) ? {
        icon: (
          <StyledCircularProgress
            thickness={5}
            size="34px"
          />
        )
      } : {})}
      action={(
        <>
          {status === FAILED && (
            <StyledButton
              variant="outlined"
              onClick={onDecommissionClick}
            >
              Try again
            </StyledButton>
          )}
          {(status === INITIALIZED && !isCancelled) && (
            <StyledButton
              variant="outlined"
              onClick={onAdd15MinutesClick}
            >
              +15 Minutes
            </StyledButton>
          )}
          {[INITIALIZED, COMPLETED, FAILED].includes(status) && (
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
                  'Back to app'
              }
            </StyledButton>
          )}
        </>
      )}
    >
      {text}
    </StyledAlert>
  )
}

export default AutoDecommissionBar

const StyledAlert = stylin(Alert)({
  minHeight: '66px',
  borderRadius: '0px',
  color: '#fff',
  '.MuiSvgIcon-root': {
    height: '34px',
    width: '34px',
  },
  '.MuiAlert-icon': {
    py: '8px'
  },
  '.MuiAlert-message': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px'
  },
  '.MuiAlert-action': {
    p: 0,
    py: '8px',
    alignItems: 'flex-start'
  }
})

const StyledButton = stylin(Button)({
  borderRadius: '0px',
  fontWeight: 'normal',
  color: '#fff',
  borderColor: '#fff',
  mr: '10px',
  whiteSpace: 'nowrap'
})

const StyledCircularProgress = stylin(CircularProgress)({
  color: '#fff'
})
