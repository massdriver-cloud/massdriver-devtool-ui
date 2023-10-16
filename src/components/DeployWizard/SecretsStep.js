import stylin from '../../utils/stylin'

import SecretsLineItem from './SecretsLineItem'
import LoadingSpinner from '../LoadingSpinner'
import Custom404 from '../Custom404'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SecretsStep = ({
  loading,
  error,
  secretFields = [],
  secretsData,
  secretsErrors,
  disableNext,
  onChange,
  next,
  back,
  currentSlideIndex
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
        {secretFields.map(({ description, json, name, required, title }) => (
          <SecretsLineItem
            key={name}
            id={name}
            hasErrors={Boolean(secretsErrors[name])}
            title={title || name}
            required={required}
            value={secretsData[name] || ''}
            onChange={onChange}
            isJson={json}
            description={description}
            formErrors={secretsErrors[name] || []}
          />
        ))}
        <NavContainer currentSlideIndex={currentSlideIndex}>
          {currentSlideIndex === 0 ? (
            <NavButton
              onClick={next}
              disabled={disableNext}
              fullWidth
              variant="contained"
            >
              Next
            </NavButton>
          ) : (
            <>
              <NavButton
                onClick={back}
                variant="contained"
              >
                Back
              </NavButton>
              <NavButton
                onClick={next}
                disabled={disableNext}
                variant="contained"
              >
                Next
              </NavButton>
            </>
          )}
        </NavContainer>
      </>
    )}
  </Container>
)

export default SecretsStep

const Container = stylin(Stack)({
  pb: '50px',
  pt: '60px',
  px: '80px',
})

const NavButton = stylin(Button)({
  mx: 0
})

const NavContainer = stylin(Box, ['currentSlideIndex'])(({ currentSlideIndex }) => ({
  display: 'flex',
  pt: '30px',
  alignItems: 'center',
  justifyContent: currentSlideIndex === 0 ? 'center' : 'space-between'
}))
