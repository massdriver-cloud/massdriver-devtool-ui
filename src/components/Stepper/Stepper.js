import stylin from 'utils/stylin'
import { isCompleted, getStepIndex, equal } from 'components/Stepper/helpers'
import StepperActions from 'components/Stepper/StepperActions'

import { Stepper as _Stepper } from '@mui/material'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

const FallbackStep = ({ children }) => (
  <>
    FallbackStep
    {children()}
  </>
)

const Stepper = ({
  steps,
  activeStep,
  actionStates,
  updateActionStates,
  generateNext,
  generateBack,
  basicNext,
  basicBack,
  data,
  childProps,
}) => {

  const StepComponent = steps.find(step => equal(step.id, activeStep))?.component || FallbackStep
  const actions = steps.find(step => equal(step.id, activeStep))?.actions

  return (
    <Container>
      <StyledStepper
        activeStep={getStepIndex(steps, activeStep)}
        numberOfSteps={steps.length}
      >
        {
          steps.map(({ id, label }) => (
            <Step
              key={id}
              completed={isCompleted(steps, id, activeStep)}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))
        }
      </StyledStepper>
      <StyledDivider />
      <StepContainer>
        <StepComponent
          updateActionStates={updateActionStates}
          generateNext={generateNext}
          generateBack={generateBack}
          next={basicNext}
          back={basicBack}
          data={data}
          stepData={data[activeStep]}
          {...childProps}
        >
          {({ next, back } = {}) => {
            const _next = generateNext(next)
            const _back = generateBack(back)
            return (
              <StepperActions
                activeStepIndex={getStepIndex(steps, activeStep)}
                actions={actions}
                actionStates={actionStates}
                next={_next}
                back={_back}
              />
            )
          }}
        </StepComponent>
      </StepContainer>
    </Container>
  )
}

export default Stepper

const Container = stylin(Box)({
  width: '100%'
})

const StepContainer = stylin(Box)({
  px: '20px',
  pt: '10px'
})

const StyledStepper = stylin(_Stepper, ['numberOfSteps'])(({ theme, numberOfSteps }) => ({
  px: '12px',
  backgroundColor: theme.palette.grey[200],
  justifyContent: numberOfSteps ? 'center' : 'start'
}))

const StyledDivider = stylin(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.grey[400]
}))
