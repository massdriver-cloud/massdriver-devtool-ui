import stylin from '../utils/stylin'
import PanelHeader from './PanelHeader'
import LoadingSpinner from './LoadingSpinner'
import Custom404 from './Custom404'
import ConnectionDropdown from './ConnectionDropdown'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const ConnectionsView = ({ types, onChange, onSubmit, formData, loading, error }) =>
  <>
    <PanelHeader
      label="Connections"
      subLabel="Save an artifact for each bundle connection. This will allow you to test connection environment variables and go through the deploy process. These artifacts are being derived from your Massdriver organzation."
    />
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Custom404 small>
          <Typography variant='h3'>
            Connections not found
          </Typography>
          <Typography variant='h6'>
            We encountered an issue parsing your bundle connections. Please restart the dev server and try again.
          </Typography>
        </Custom404>
      ) : (
        <>
          <Fields spacing={6}>
            {types.map(type => (
              <ConnectionDropdown
                key={type}
                type={type}
                onChange={onChange}
                value={formData[type] || ''}
              />
            ))}
          </Fields>
          <SubmitButton
            onClick={onSubmit}
            variant="contained"
            size="large"
            fullWidth
          >
            Save
          </SubmitButton>
        </>
      )}
    </Container>
  </>

export default ConnectionsView

const Container = stylin(Box)({
  px: '80px',
  py: '50px',
  backgroundColor: 'white'
})

const Fields = stylin(Stack)({
})

const SubmitButton = stylin(Button)({
  mt: '30px',
  mb: '10px',
})
