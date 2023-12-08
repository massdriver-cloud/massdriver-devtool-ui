import React, { useState } from 'react'
import stylin from '../../utils/stylin'
import Header from './Header'
import NavButtons from './NavButtons'

import { getStepMap } from './StepWizard.helpers'

import StepWizard from 'react-step-wizard'

import Box from '@mui/material/Box'

const CustomStepWizard = ({
  onComplete,
  children,
  stepLabels = [],
  wizardProps,
  hideFirstStepNav
}) => {
  const [currentStep, setCurrentStep] = useState(
    wizardProps?.initialStep || stepLabels?.[0]?.subSteps ? '1-1' : '1'
  )

  const stepMap = getStepMap(stepLabels)

  const onStepChange = ({ activeStep }) => {
    setCurrentStep(stepMap[activeStep])
  }

  return (
    <Box>
      {stepLabels && (
        <Header activeStep={currentStep} stepLabels={stepLabels} />
      )}
      <StyledStepWizard onStepChange={onStepChange} {...wizardProps}>
        {React.Children.map(
          children,
          child =>
            child &&
            React.cloneElement(child, {
              navButtons: NavButtons
            })
        )}
      </StyledStepWizard>
    </Box>
  )
}

export default CustomStepWizard

const StyledStepWizard = stylin(StepWizard)({
  display: 'flex',
  flexDirection: 'column-reverse'
})
