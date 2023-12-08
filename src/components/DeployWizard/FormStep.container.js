import { useState } from 'react'
import { useSnackbar } from 'notistack'
import stylin from '../../utils/stylin'

import ConfigureForm from '../ConfigureForm/ConfigureForm.container'
import useGetFormSchemas from '../../hooks/queries/useGetFormSchemas'
import LoadingSpinner from '../LoadingSpinner'
import Custom404 from '../Custom404'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'


const EnhancedFormStep = ({ currentSlideIndex, back, next, data }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { schema, uiSchema, loading, error } = useGetFormSchemas()

  const onChange = ({ formData: newFormData }) =>
    setFormData({
      ...formData,
      ...(newFormData || {})
    })

  const onSubmit = () => {
    setIsLoading(true)

    fetch('http://127.0.0.1:8080/bundle/deploy', {
      method: 'POST',
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify({
        action: 'provision',
        params: formData,
      })
    })
      .then(res => res.json())
      .then(data => {
        enqueueSnackbar("Started Deployment.", {
          variant: 'info',
          preventDuplicate: true,
          autoHideDuration: 5000,
          disableWindowBlurListener: true
        })
        next({ containerId: data?.containerID, action: 'provision' })
      })
      .catch(err => {
        console.log(err)
        enqueueSnackbar("There was an issue starting the deployment.", {
          variant: 'error',
          preventDuplicate: true,
          autoHideDuration: 5000,
          disableWindowBlurListener: true
        })
      })
      .finally(() => setIsLoading(false))
  }

  const onBack = () => back({ ...data?.secretsData })



  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <Custom404 small>
      <Typography variant='h3'>
        Bundle Schemas not found
      </Typography>
      <Typography variant='h6'>
        We encountered an issue parsing your bundle schemas. Please restart the dev server and try again.
      </Typography>
    </Custom404>
  ) : schema && uiSchema && (
    <ConfigureForm
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      onChange={onChange}
      submitButton={(
        <NavContainer currentSlideIndex={currentSlideIndex}>
          {currentSlideIndex === 0 ? (
            <DeployButton
              onClick={onSubmit}
              fullWidth
              variant="contained"
              loading={isLoading}
            >
              Deploy
            </DeployButton>
          ) : (
            <>
              <BackButton
                onClick={onBack}
                variant="contained"
              >
                Back
              </BackButton>
              <DeployButton
                onClick={onSubmit}
                variant="contained"
                loading={isLoading}
              >
                Deploy
              </DeployButton>
            </>
          )}
        </NavContainer>
      )}
    />
  )
}

export default EnhancedFormStep

const BackButton = stylin(Button)({
  mx: 0
})

const DeployButton = stylin(LoadingButton)({
  mx: 0
})

const NavContainer = stylin(Box, ['currentSlideIndex'])(({ currentSlideIndex }) => ({
  display: 'flex',
  pt: '30px',
  alignItems: 'center',
  justifyContent: currentSlideIndex === 0 ? 'center' : 'space-between'
}))
