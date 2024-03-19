import stylin from 'utils/stylin'

import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'

const StepperActions = ({
  activeStepIndex,
  actions = {},
  actionStates = {},
  isOptional,
  next: onNext,
  back: onBack
}) => {

  const { back = {}, skip = {}, next = {} } = actions
  const { back: backStates = {}, skip: skipStates = {}, next: nextStates = {} } = actionStates

  return (
    <Container>
      {back?.hidden !== true && (
        <ActionButton
          variant='outlined'
          sx={back?.sx}
          type={back?.type || 'button'}
          {...backStates}
          disabled={backStates.disabled || activeStepIndex === 0}
          onClick={back?.type === 'submit' ? () => { } : onBack}
        >
          {back?.label || 'Back'}
        </ActionButton>
      )}
      <Row>
        {/* Built out skip functionality into the actions logic. */}
        {/* It is currently not used anywhere and will need to be fully implemented in the Stepper before */}
        {(isOptional && skip?.hidden !== true) && (
          <ActionButton
            variant='outlined'
            sx={skip?.sx}
            type={skip?.type || 'button'}
            {...skipStates}
          >
            {skip?.label || 'Skip'}
          </ActionButton>
        )}
        {next?.hidden !== true && (
          <ActionButton
            variant='outlined'
            sx={next?.sx}
            type={next?.type || 'button'}
            {...nextStates}
            onClick={next?.type === 'submit' ? () => { } : onNext}
          >
            {next?.label || 'Next'}
          </ActionButton>
        )}
      </Row>
    </Container>
  )
}

export default StepperActions

const Container = stylin(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  py: '10px'
})

const Row = stylin(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
})

const ActionButton = stylin(LoadingButton)({

})
