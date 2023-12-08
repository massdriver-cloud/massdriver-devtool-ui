import stylin from '../../utils/stylin'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

const Header = ({ stepLabels, activeStep }) => {
  const activeMainStep = parseInt(activeStep?.split('-')[0] || '1', 10) - 1

  const activeSubStep =
    activeStep?.split('-')[1] !== undefined
      ? parseInt(activeStep?.split('-')[1] || '1', 10) - 1
      : undefined

  return (
    <StyledStepper activeStep={activeMainStep}>
      {stepLabels.map((stepLabel, index) => (
        <Step key={stepLabel?.label} completed={activeMainStep > index}>
          <StepLabel
            optional={
              index === activeMainStep &&
              stepLabel?.subSteps?.[activeSubStep] && (
                <Typography variant='caption'>
                  {stepLabel?.subSteps?.[activeSubStep]}
                </Typography>
              )
            }
          >
            {stepLabel?.label}
          </StepLabel>
        </Step>
      ))}
    </StyledStepper>
  )
}

export default Header

const StyledStepper = stylin(Stepper)({
  borderBottom: 'solid 1px #d0d2e1'
})
