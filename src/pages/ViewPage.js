import stylin from 'utils/stylin'

import ConnectionsSection from 'components/ConnectionsSection/ConnectionsSection.container'
import ArtifactsSection from 'components/ArtifactsSection/ArtifactsSection.container'
import SecretsSection from 'components/SecretsSection/SecretsSection.container'
import FormSection from 'components/FormSection/FormSection.container'

import Box from '@mui/material/Box'

const ViewPage = () => {

  return (
    <PageContainer>
      {/* <ConnectionsSection /> */}
      {/* <ArtifactsSection /> */}
      {/* <SecretsSection /> */}
      <FormSection />
    </PageContainer>
  )
}

export default ViewPage

const PageContainer = stylin(Box)({
  px: '30px',
  py: '20px'
})
