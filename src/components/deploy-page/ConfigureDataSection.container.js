
import ConfigureDataSection from 'components/deploy-page/ConfigureDataSection'
import useGetSavedParams from 'hooks/queries/useGetSavedParams'

const EnhancedConfigureDataSection = ({ }) => {
  const { data, loading, error } = useGetSavedParams()

  return (
    <ConfigureDataSection
      loading={loading}
      error={error}
      params={data}
    />
  )
}

export default EnhancedConfigureDataSection
