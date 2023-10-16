import stylin from '../../utils/stylin'
import WaterfallSlides from '../WaterfallSlides'
import useGetDeployWizardData from '../../hooks/queries/useGetDeployWizardData'
import PanelHeader from '../PanelHeader'

// Steps
import ConnectionsStep from './ConnectionsStep.container'
import SecretsStep from './SecretsStep.container'
import FormStep from './FormStep.container'

import LoadingSpinner from '../LoadingSpinner'
import Custom404 from '../Custom404'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'

const DeployWizard = () => {

  const { hasConnections, hasSecrets, loading, error } = useGetDeployWizardData()

  return (
    <>
      <PanelHeader
        label="Provision Bundle"
        subLabel="Walk through the steps to provision your bundle locally."
      />
      <BackButton
        variant="outlined"
        startIcon={<ArrowLeftIcon sx={{ width: '25px', height: '25px' }} />}
        href='/'
      >
        Back to App
      </BackButton>
      {
        loading ? (
          <LoadingSpinner />
        ) : error ? (
          <Custom404 small>
            <Typography variant='h1'>
              Package Secrets not found
            </Typography>
            <Typography variant='h6'>
              We encountered a problem when grabbing your package secrets.{' '}
            </Typography>
          </Custom404>
        ) : (
          <WaterfallSlides
            components={[
              ...(hasConnections ? [ConnectionsStep] : []),
              ...(hasSecrets ? [SecretsStep] : []),
              FormStep
            ]}
            initialData={{}}
          />
          // <StepWizard
          //   stepLabels={[
          //     ...(hasConnections === true ? [{
          //       label: 'Choose Connections'
          //     }] : []),
          //     ...(hasSecrets === true ? [{
          //       label: 'Set Secrets'
          //     }] : []),
          //     {
          //       label: 'Configure Package'
          //     },
          //     {
          //       label: 'Choose Provisioner'
          //     },
          //     {
          //       label: 'Deploy'
          //     }
          //   ]}
          //   hideFirstStepNav
          // >
          //   {hasConnections && (
          //     <ConnectionsStep />
          //   )}
          //   {hasSecrets === true && (
          //     <SecretsStep />
          //   )}
          // </StepWizard>
        )
      }
    </>
  )
}

export default DeployWizard

const BackButton = stylin(Button)({
  position: 'absolute',
  top: 22,
  right: 30,
  '.MuiButton-startIcon': {
    mr: 0,
    ml: '-12px'
  }
})
