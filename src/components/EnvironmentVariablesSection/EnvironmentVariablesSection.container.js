
import EnvironmentVariablesSection from 'components/EnvironmentVariablesSection/EnvironmentVariablesSection'
import useGetEnvironmentVariables from 'hooks/queries/useGetEnvironmentVariables'

const EnhancedEnvironmentVariablesSection = ({ }) => {
  const { data, loading, error } = useGetEnvironmentVariables()

  return (
    <EnvironmentVariablesSection
      loading={loading}
      error={error}
      envs={data}
    />
  )
}

export default EnhancedEnvironmentVariablesSection
