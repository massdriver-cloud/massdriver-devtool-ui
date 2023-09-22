import stylin from '../../utils/stylin'
import SecretLineItem from './SecretLineItem.container'
import LoadingSpinner from '../LoadingSpinner'
import Custom404 from '../Custom404'
import PanelHeader from '../PanelHeader'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const SecretsView = ({ loading, error, secretFields, bundleName }) => (
  <>
    <PanelHeader
      label="Secrets"
      subLabel="View and set secrets for your test bundle."
    />
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
        <SecretsContainer>
          {secretFields?.map(secret => (
            <SecretLineItem
              key={secret?.name}
              name={secret?.name}
              title={secret?.title}
              description={secret?.description}
              required={secret?.required}
              isJson={secret?.json}
              bundleName={bundleName}
            />
          ))}
        </SecretsContainer>
      )
    }
  </>
)

export default SecretsView

const SecretsContainer = stylin(Box)({
  py: '50px',
  px: '80px'
})
