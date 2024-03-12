

export const isCompleted = (steps = [], currentStep, activeStep) => getStepIndex(steps, currentStep) < getStepIndex(steps, activeStep)

export const equal = (id, activeStep) => id?.toString() === activeStep?.toString()

export const getStepIndex = (steps = [], id) => steps.map(step => step.id).indexOf(id)

export const getPreviousStepId = (steps, activeStep) => steps[getStepIndex(steps, activeStep) - 1].id

export const getNextStepId = (steps, activeStep) => steps[getStepIndex(steps, activeStep) + 1].id


const DEFAULT_ACTION_STATES = {
  back: {
    disabled: false,
    loading: false
  },
  next: {
    disabled: false,
    loading: false
  }
}

export const getStepActionStates = (steps, stepId) => {
  const actions = steps.find(step => equal(step.id, stepId))?.actions

  return {
    back: { ...DEFAULT_ACTION_STATES.back, ...actions?.back?.initialState },
    next: { ...DEFAULT_ACTION_STATES.next, ...actions?.next?.initialState }
  }
}
