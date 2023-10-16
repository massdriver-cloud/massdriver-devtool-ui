import { useState } from 'react'
import { useSnackbar } from 'notistack'
import stylin from '../../utils/stylin'

import ConfigureForm from '../ConfigureForm/ConfigureForm.container'
import useGetFormSchemas from '../../hooks/queries/useGetFormSchemas'
import LoadingSpinner from '../LoadingSpinner'
import Custom404 from '../Custom404'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'


const EnhancedFormStep = ({ currentSlideIndex, back, next, data }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [formData, setFormData] = useState({})

  const { schema, uiSchema, loading, error } = useGetFormSchemas()

  const onChange = ({ formData: newFormData }) =>
    setFormData({
      ...formData,
      ...(newFormData || {})
    })

  const onSubmit = ({ }) => {

    enqueueSnackbar("Input passed form validation.", {
      variant: 'success',
      preventDuplicate: true,
      autoHideDuration: 5000,
      disableWindowBlurListener: true
    })
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
            <NavButton
              onClick={onSubmit}
              fullWidth
              variant="contained"
            >
              Deploy
            </NavButton>
          ) : (
            <>
              <NavButton
                onClick={onBack}
                variant="contained"
              >
                Back
              </NavButton>
              <NavButton
                onClick={onSubmit}
                variant="contained"
              >
                Deploy
              </NavButton>
            </>
          )}
        </NavContainer>
      )}
    />
  )
}

export default EnhancedFormStep

const NavButton = stylin(Button)({
  mx: 0
})

const NavContainer = stylin(Box, ['currentSlideIndex'])(({ currentSlideIndex }) => ({
  display: 'flex',
  pt: '30px',
  alignItems: 'center',
  justifyContent: currentSlideIndex === 0 ? 'center' : 'space-between'
}))
