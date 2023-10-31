import { useState, useEffect } from 'react'
import { isValidJsonObject, parseJson } from '../../utils/data'
import SecretLineItem from './SecretLineItem'
import { useSnackbar } from 'notistack'

const EnhancedSecretLineItem = ({
  name,
  title,
  description,
  required,
  isJson,
  bundleName
}) => {
  const { enqueueSnackbar } = useSnackbar()

  const [bundleSecretsData, setBundleSecretsData] = useState({})
  const previousValue = bundleSecretsData?.[name] || ''

  const [formData, setFormData] = useState('')
  const [formErrors, setFormErrors] = useState([])
  const [isEditable, setIsEditable] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isClearConfirmationOpen, setIsClearConfirmationOpen] = useState(false)
  const hasErrors = formErrors?.length > 0

  useEffect(() => {
    const { parsedJson } = parseJson(window.localStorage.getItem(`${bundleName}-secrets`))
    const bundleData = parsedJson || {}
    setBundleSecretsData(bundleData)
    setIsEditable(!bundleData?.[name])
    setFormData(bundleData?.[name] || '')
  }, [])

  const setSecret = successMessage => {
    const newBundleSecretsData = { ...bundleSecretsData, [name]: formData }
    setBundleSecretsData(newBundleSecretsData)
    window.localStorage.setItem(`${bundleName}-secrets`, JSON.stringify(newBundleSecretsData))

    setIsEditable(false)

    successMessage && enqueueSnackbar(successMessage, {
      variant: 'success',
      preventDuplicate: true,
      autoHideDuration: 5000,
      disableWindowBlurListener: true
    })
  }

  const unsetSecret = successMessage => {
    const { [name]: stuff, ...newBundleSecretsData } = bundleSecretsData
    setBundleSecretsData(newBundleSecretsData)
    window.localStorage.setItem(`${bundleName}-secrets`, JSON.stringify(newBundleSecretsData))

    setFormData('')
    setIsEditable(true)

    successMessage && enqueueSnackbar(successMessage, {
      variant: 'success',
      preventDuplicate: true,
      autoHideDuration: 5000,
      disableWindowBlurListener: true
    })
  }

  const onChange = event => setFormData(event?.target?.value)

  const onSubmit = () =>
    isJson
      ? isValidJsonObject(formData)
        ? setSecret('Secret Successfully Set!')
        : setFormErrors(['Invalid JSON Object.'])
      : setSecret('Secret Successfully Set!')

  const onEditClick = () => {
    setFormData('')
    setIsEditable(true)
  }

  const onCancelEditClick = () => {
    setIsEditable(false)
    setFormData(previousValue || '')
  }

  const onEditSave = () =>
    isJson
      ? isValidJsonObject(formData)
        ? setSecret('Secret Successfully Updated!')
        : setFormErrors(['Invalid JSON Object.'])
      : setSecret('Secret Successfully Updated!')

  const onClearClick = () => setIsClearConfirmationOpen(true)

  const onClearClickAway = () => setIsClearConfirmationOpen(false)

  return (
    <SecretLineItem
      title={title || name}
      description={description}
      required={required}
      isJson={isJson}
      onChange={onChange}
      onSubmit={onSubmit}
      onEditClick={onEditClick}
      onCancelEditClick={onCancelEditClick}
      onEditSave={onEditSave}
      onConfirmClearClick={() => unsetSecret('Secret Successfully Cleared!')}
      onClearClick={onClearClick}
      onClearClickAway={onClearClickAway}
      isClearConfirmationOpen={isClearConfirmationOpen}
      isEditable={isEditable}
      isLoading={isLoading}
      hasErrors={hasErrors}
      value={formData}
      previousValue={previousValue}
      formErrors={formErrors}
    />
  )
}

export default EnhancedSecretLineItem
