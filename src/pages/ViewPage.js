import stylin from 'utils/stylin'

import ConnectionsSection from 'components/ConnectionsSection/ConnectionsSection.container'
import ArtifactsSection from 'components/ArtifactsSection/ArtifactsSection.container'
import SecretsSection from 'components/SecretsSection/SecretsSection.container'
import FormSection from 'components/FormSection/FormSection.container'

import Box from '@mui/material/Box'

const ViewPage = () => {

  return (
    <PageContainer>
      <FlexBox>
        <FlexBox direction="column">
          <ConnectionsSection />
          <ArtifactsSection />
        </FlexBox>
        <SecretsSection />
      </FlexBox>
      <Box pt="26px">
        <FormSection />
      </Box>
    </PageContainer>
  )
}

export default ViewPage

const PageContainer = stylin(Box)({
  px: '30px',
  py: '20px'
})

const FlexBox = stylin(Box, ['direction'])(({ direction }) => ({
  display: 'flex',
  gap: '26px',
  flexDirection: direction || {
    xs: 'column',
    md: 'row'
  }
}))
