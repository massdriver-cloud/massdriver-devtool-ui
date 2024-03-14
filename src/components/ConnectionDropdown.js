import stylin from '../utils/stylin'
import useFetch from '../hooks/useFetch'
import { useAuth } from '../contexts/authContext'

import { GQL_API_ENDPOINT } from '../constants/api'

import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

const GET_ARTIFACTS = `
    query artifacts($organizationId: ID!, $input: ArtifactsInput) {
      artifacts(organizationId: $organizationId, input: $input) {
        items {
          id
          name
          type
        }
      }
    }
  `

const IS_SET = 'isSet'
const MANUAL = 'manual'

const customRenderValue = (value, artifacts) => value === IS_SET
  ? (
    <Tooltip
      title={(
        <Typography>
          This connection has already been set in the <strong>_connections.auto.tfvars.json</strong>. Feel free to update if desired.
        </Typography>
      )}
      placement="top-start"
    >
      <Typography>Saved Connection</Typography>
    </Tooltip>
  ) : value === MANUAL ? (
    <Tooltip
      title={(
        <Typography>
          This connection must be manually set in the <strong>_connections.auto.tfvars.json</strong>.
        </Typography>
      )}
      placement="top-start"
    >
      <Typography>Manually set connection</Typography>
    </Tooltip>
  )
    : artifacts?.find(art => art.id === value)?.name

const ConnectionDropdown = ({ id, type, value, onChange, isSet, ...props }) => {
  const { organizationId, serviceAccountId } = useAuth()

  const { data, loading, error: loadingError } = useFetch(GQL_API_ENDPOINT, {
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + serviceAccountId
      },
      method: 'POST',
      body: JSON.stringify({
        query: GET_ARTIFACTS,
        variables: {
          organizationId: organizationId,
          input: {
            filter: {
              type
            }
          }
        }
      })
    }
  })

  const formattedArtifacts = data?.data?.artifacts?.items

  return (
    <TextField
      select
      fullWidth
      value={value}
      onChange={onChange}
      label={`${id} (${type})`}
      name={id}
      SelectProps={{ renderValue: value => customRenderValue(value, formattedArtifacts) }}
      sx={{ '.MuiInputBase-root': { borderRadius: '4px' } }}
      {...props}
    >
      <Tooltip
        title={(
          <Typography>
            The value that is currently set for this connection in the <strong>_connections.auto.tfvars.json</strong>.
          </Typography>
        )}
        key="isSet"
        placement="top-start"
        componentsProps={{ tooltip: { sx: { maxWidth: '400px' } } }}
        value="isSet"
      >
        <MenuItem value="isSet" sx={{ ...(loading || !isSet ? { display: 'none !important' } : {}) }}>
          Saved connection
        </MenuItem>
      </Tooltip>
      <Tooltip
        title={(
          <Typography>
            Manually fulfill the connection by editing the <strong>_connections.auto.tfvars.json</strong>.
          </Typography>
        )}
        key="manual"
        value="manual"
        placement="top-start"
        componentsProps={{ tooltip: { sx: { maxWidth: '400px' } } }}
      >
        <MenuItem value="manual">
          Manually set connection
        </MenuItem>
      </Tooltip>
      {
        loading ? (
          <LoadingContainer>
            <CircularProgress size={20} />
          </LoadingContainer>
        ) : loadingError ? (
          <Typography variant='h6'>
            There was an issue fetching your artifacts.
          </Typography>
        ) : formattedArtifacts?.length > 0 ? (
          formattedArtifacts.map(artifact => (
            <MenuItem key={artifact?.id} value={artifact?.id}>
              {artifact?.name}
            </MenuItem>
          ))
        ) : (
          <Typography variant='h6'>
            Your organization does not have any artifacts of type '{type}'.
          </Typography>
        )
      }
    </TextField >
  )
}

export default ConnectionDropdown

const LoadingContainer = stylin(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
