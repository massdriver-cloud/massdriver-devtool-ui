import stylin from 'utils/stylin'
import ConnectionDropdown from 'components/ConnectionDropdown'
import ConfirmationModal from 'components/ConfirmationModal'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ConnectionsStep = ({
  loading,
  error,
  connections = {},
  formData = {},
  onChange,
  isModalOpen,
  closeModal,
  onConfirmModal,
  children,
  onNext,
}) => (
  <>
    <Container>
      {loading ? (
        <EmptyMessage>Loading...</EmptyMessage>
      ) : error ? (
        <EmptyMessage>Error: There was an issue parsing your connection data.</EmptyMessage>
      ) : (
        <>
          <Column>
            <Header>
              <Title>Cloud credentials</Title>
              <Description>
                The cloud credentials that will be used to deploy the bundle. In the app, these will be fulfilled by the environment-wide "Cloud Credentials." You can either select a previously saved credential, one from your organization, or manually fulfill it by changing the <strong>_connection.auto.tfvars.json</strong>.
              </Description>
            </Header>
            <Column gap='16px'>
              {connections.credentials?.length > 0 ? connections.credentials?.map(({ id, type, required, isSet }) => (
                <ConnectionDropdown
                  key={id}
                  id={id}
                  required={required}
                  type={type}
                  onChange={onChange}
                  value={formData[id] || ''}
                  isSet={isSet}
                />
              )) : (
                <EmptyMessage>This bundle does not require credential connections...</EmptyMessage>
              )}
            </Column>
          </Column>
          <Column>
            <Header>
              <Title>Normal connections</Title>
              <Description>
                These are the bundles' normal dependent connections. In the app, these will appear as the left handles on the package. You can either select a previously saved credential, one from your organization, or manually fulfill it by changing the <strong>_connection.auto.tfvars.json</strong>.
              </Description>
            </Header>
            <Column gap='16px'>
              {connections.normal?.length > 0 ? connections.normal?.map(({ id, type, required, isSet }) => (
                <ConnectionDropdown
                  key={id}
                  id={id}
                  required={required}
                  type={type}
                  onChange={onChange}
                  value={formData[id] || ''}
                  isSet={isSet}
                />
              )) : (
                <EmptyMessage>This bundle does not require normal connections...</EmptyMessage>
              )}
            </Column>
          </Column>
          {children({ next: onNext })}
        </>
      )}
    </Container>
    <ConfirmationModal
      isOpen={isModalOpen}
      onCloseClick={closeModal}
      onConfirmClick={onConfirmModal}
      title='Manually set connections'
      isDanger
      confirmText='Ok'
      description={
        <>
          <Text>
            You have selected to manually set credentials. Please update the <strong>_connections.auto.tfvars.json</strong> before deploying. Your updated data may not be reflected in the UI until page reload.
          </Text>
          <SubText>If not updated properly, the deployment will fail.</SubText>
        </>
      }
    />
  </>
)

export default ConnectionsStep

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  pt: '6px'
})
const Column = stylin(Box, ['gap'])(({ gap }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: gap || '20px',
}))

const Header = stylin(Box)({

})

const EmptyMessage = stylin(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[900],
  fontWeight: 'bold',
}))

const Title = stylin(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.grey[900]
}))

const Description = stylin(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.grey[700]
}))

const Text = stylin(Typography)({
  fontSize: '16px'
})

const SubText = stylin(Typography)({
  mt: '20px',
  fontSize: '14px',
  WebkitFontSmoothing: 'subpixel-antialiased',
  fontStyle: 'italic',
  color: '#8d8d8d'
})
