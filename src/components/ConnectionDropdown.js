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

const ConnectionDropdown = ({ type, value, onChange, hasConnectionSet, ...props }) => {
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
      label={type}
      name={type}
      SelectProps={{
        renderValue: value =>
          value === 'currentlySet'
            ? (
              <Tooltip
                title='This connection has already been set. Feel free to update if desired.'
                placement="top-start"
              >
                <Typography>Currently Set Connection</Typography>
              </Tooltip>
            )
            : formattedArtifacts?.find(art => art.id === value)?.name
      }}
      {...props}
    >
      <Tooltip
        title='The value that is currently set for this connection.'
        key="prev"
        value="currentlySet"
        placement="top-start"
      >
        <MenuItem
          key="prev"
          value="currentlySet"
          sx={{
            ...(loading || loadingError || formattedArtifacts?.length < 1 || !hasConnectionSet ? { display: 'none !important' } : {})
          }}
        >
          Currently Set Connection
        </MenuItem>
      </Tooltip>
      {loading ? (
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
      )}
    </TextField>
  )
}

export default ConnectionDropdown

const LoadingContainer = stylin(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
