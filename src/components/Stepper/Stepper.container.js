import { useState, useMemo } from 'react'

import Stepper from 'components/Stepper/Stepper'
import { equal, getNextStepId, getPreviousStepId, getStepActionStates } from 'components/Stepper/helpers'

const EnhancedStepper = ({
  steps = [],
}) => {
  const [activeStep, setActiveStep] = useState(steps[0].id)

  const initialActionStates = useMemo(() => getStepActionStates(steps, activeStep), [activeStep])

  const [actionStates, setActionStates] = useState(initialActionStates)
  const [data, setData] = useState({})

  const generateBack = backSubmit => () => {
    setActionStates(actionStates => ({
      ...actionStates,
      back: { ...actionStates.back, loading: true }
    }))
    const data = backSubmit ? backSubmit() : true
    if (data) {
      typeof data !== 'boolean' && setData(prevData => ({ ...prevData, [activeStep]: data }))
      const prevStepId = getPreviousStepId(steps, activeStep)
      setActiveStep(prevStepId)
      setActionStates(getStepActionStates(steps, prevStepId))
      return
    }
    setActionStates(initialActionStates)
  }

  const generateNext = nextSubmit => () => {
    setActionStates(actionStates => ({
      ...actionStates,
      next: { ...actionStates.next, loading: true }
    }))
    const data = nextSubmit ? nextSubmit() : true
    if (data) {
      typeof data !== 'boolean' && setData(prevData => ({ ...prevData, [activeStep]: data }))
      const nextStepId = getNextStepId(steps, activeStep)
      setActiveStep(nextStepId)
      setActionStates(getStepActionStates(steps, nextStepId))
      return
    }

    setActionStates(initialActionStates)
  }

  return (
    <Stepper
      steps={steps}
      activeStep={activeStep}
      actionStates={actionStates}
      updateActionStates={setActionStates}
      generateNext={generateNext}
      generateBack={generateBack}
      data={data}
    />
  )
}

export default EnhancedStepper
