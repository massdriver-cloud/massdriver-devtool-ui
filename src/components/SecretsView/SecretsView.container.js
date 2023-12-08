
import SecretsView from './SecretsView'
import useGetBundleSecrets from '../../hooks/queries/useGetBundleSecrets'

const EnhancedSecretsView = ({ }) => {
  const { data, loading, error } = useGetBundleSecrets()

  return (
    <SecretsView
      secretFields={data?.secretFields}
      bundleName={data?.bundleName}
      loading={loading}
      error={error}
    />
  )
}

export default EnhancedSecretsView
