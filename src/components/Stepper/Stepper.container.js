import { useState, useMemo } from 'react'

import Stepper from 'components/Stepper/Stepper'
import { getNextStepId, getPreviousStepId, getStepActionStates } from 'components/Stepper/helpers'

const EnhancedStepper = ({
  steps = [],
}) => {
  const [activeStep, setActiveStep] = useState(steps[0].id)

  const initialActionStates = useMemo(() => getStepActionStates(steps, activeStep), [activeStep])

  const [actionStates, setActionStates] = useState(initialActionStates)
  const [data, setData] = useState({})

  const generateBack = backSubmit => async () => {
    setActionStates(actionStates => ({
      ...actionStates,
      back: { ...actionStates.back, loading: true }
    }))
    const response = backSubmit ? await backSubmit() : { successful: true }
    if (response?.successful) {
      response?.data && setData(prevData => ({ ...prevData, [activeStep]: response?.data }))
      const prevStepId = getPreviousStepId(steps, activeStep)
      setActiveStep(prevStepId)
      setActionStates(getStepActionStates(steps, prevStepId))
      return
    }
    setActionStates(actionStates => ({
      ...actionStates,
      back: { ...actionStates.back, loading: false }
    }))
  }

  const generateNext = nextSubmit => async () => {
    setActionStates(actionStates => ({
      ...actionStates,
      next: { ...actionStates.next, loading: true }
    }))
    const response = nextSubmit ? await nextSubmit() : { successful: true }
    if (response?.successful) {
      response?.data && setData(prevData => ({ ...prevData, [activeStep]: response?.data }))
      const nextStepId = getNextStepId(steps, activeStep)
      setActiveStep(nextStepId)
      setActionStates(getStepActionStates(steps, nextStepId))
      return
    }
    setActionStates(actionStates => ({
      ...actionStates,
      next: { ...actionStates.next, loading: false }
    }))
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
