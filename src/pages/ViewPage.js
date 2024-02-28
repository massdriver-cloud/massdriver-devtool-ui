import stylin from 'utils/stylin'

import ConnectionsSection from 'components/ConnectionsSection/ConnectionsSection.container'
import ArtifactsSection from 'components/ArtifactsSection/ArtifactsSection.container'

import Box from '@mui/material/Box'

const ViewPage = () => {

  return (
    <PageContainer>
      <ConnectionsSection />
      <ArtifactsSection />
    </PageContainer>
  )
}

export default ViewPage

const PageContainer = stylin(Box)({
  px: '30px',
  py: '20px'
})
