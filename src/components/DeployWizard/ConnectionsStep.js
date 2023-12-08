import stylin from '../../utils/stylin'
import LoadingSpinner from '../LoadingSpinner'
import Custom404 from '../Custom404'
import ConnectionDropdown from '../ConnectionDropdown'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

const ConnectionsStep = ({
  types,
  onChange,
  onSubmit,
  formData,
  loading,
  error,
  submitLoading,
  hasConnectionSetMap,
  isMissingFormData
}) => (
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
              required
              key={type}
              type={type}
              onChange={onChange}
              value={formData[type] || ''}
              hasConnectionSet={hasConnectionSetMap[type]}
            />
          ))}
        </Fields>
        <NextButton
          onClick={onSubmit}
          loading={submitLoading}
          disabled={isMissingFormData}
          fullWidth
          variant="contained"
        >
          Next
        </NextButton>
      </>
    )}
  </Container>
)

export default ConnectionsStep

const Container = stylin(Box)({
  px: '80px',
  pb: '50px',
  pt: '60px',
})

const Fields = stylin(Stack)({
})

const NextButton = stylin(LoadingButton)({
  mt: '50px',
  mx: 0
})
