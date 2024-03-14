// import DeployWizard from '../components/DeployWizard/DeployWizard'
import Stepper from 'components/Stepper/Stepper.container'

import ConnectionsStep from 'components/deploy-page/ConnectionsStep.container'
import SecretsStep from 'components/deploy-page/SecretsStep.container'

const STEPS = [
  {
    id: 1,
    label: 'Set connections',
    component: ConnectionsStep,
    actions: { next: { initialState: { disabled: true } } }
  },
  {
    id: 2,
    label: 'Set secrets',
    component: SecretsStep,
    actions: { next: { initialState: { disabled: true } } }
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
