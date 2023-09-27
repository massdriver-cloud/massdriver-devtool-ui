import StepWizard from '../components/StepWizard/StepWizard'

const DeployPage = () => {

  return (
    <StepWizard
      stepLabels={[
        {
          label: 'Choose Connections'
        },
        {
          label: 'Set Secrets'
        },
        {
          label: 'Configure Package'
        },
        {
          label: 'Deploy'
        },
        {
          label: 'View Artifact'
        }
      ]}
      wizardProps={{
        isLazyMount: true,
        styles: {
          width: '960px'
        }
      }}
      hideFirstStepNav
    >

    </StepWizard>
  )
}

export default DeployPage
