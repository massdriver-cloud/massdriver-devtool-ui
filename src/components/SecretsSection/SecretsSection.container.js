import SecretsSection from 'components/SecretsSection/SecretsSection'
import useGetSecrets from 'hooks/queries/useGetSecrets'

const EnhancedSecretsSection = () => {
  const { data, loading, error } = useGetSecrets()

  return (
    <SecretsSection
      loading={loading}
      error={error}
      secrets={data}
    />
  )
}

export default EnhancedSecretsSection
