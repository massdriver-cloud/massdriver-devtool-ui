// import DeployWizard from '../components/DeployWizard/DeployWizard'
import Stepper from 'components/Stepper/Stepper.container'

const STEPS = [
  {
    id: 1,
    label: 'Set connections'
  },
  {
    id: 2,
    label: 'Set secrets'
  },
  {
    id: 3,
    label: 'Configure bundle',
    actions: { next: { label: 'Submit' } }
  },
]

const DeployPage = () => {

  return (
    <Stepper
      steps={STEPS}
    />
  )
}

export default DeployPage
