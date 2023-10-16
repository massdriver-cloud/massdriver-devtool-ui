import { useState } from 'react'
import { isValidJsonObject } from '../../utils/data'

import SecretsStep from './SecretsStep'
import useGetBundleSecrets from '../../hooks/queries/useGetBundleSecrets'

const EnhancedSecretsStep = ({
  next,
  back,
  currentSlideIndex,
  backData,
}) => {
  const [secretsData, setSecretsData] = useState(backData || {})
  const [secretsErrors, setSecretsErrors] = useState({})

  const { data, loading, error } = useGetBundleSecrets()

  const onChange = event => setSecretsData(secretsData => ({
    ...secretsData,
    [event.target.id]: event.target.value
  }))

  const onSubmit = () => {
    const errors = data?.secretFields.reduce((acc, cur) => {
      const jsonPass = cur?.json ? isValidJsonObject(secretsData[cur?.name]) : true
      return {
        ...acc,
        ...(!jsonPass ? {
          [cur?.name]: ['Invalid JSON']
        } : {})
      }
    }, {})

    setSecretsErrors(errors)
    if (Object.keys(errors).length !== 0) return

    next({ secretsData })
  }

  const needsRequiredSecrets = data?.secretFields.some(({ name, required }) => required ? secretsData[name] === undefined : false)

  return (
    <SecretsStep
      loading={loading}
      error={error}
      secretFields={data?.secretFields}
      secretsData={secretsData}
      secretsErrors={secretsErrors}
      disableNext={needsRequiredSecrets}
      onChange={onChange}
      currentSlideIndex={currentSlideIndex}
      next={onSubmit}
      back={back}
    />
  )
}

export default EnhancedSecretsStep
