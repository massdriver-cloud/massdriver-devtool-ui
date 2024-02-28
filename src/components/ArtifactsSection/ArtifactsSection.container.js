import ArtifactsSection from 'components/ArtifactsSection/ArtifactsSection'
import useGetSchemaArtifacts from 'hooks/queries/useGetSchemaArtifacts'

const EnhancedArtifactsSection = () => {
  const { data, loading, error } = useGetSchemaArtifacts()

  return (
    <ArtifactsSection
      loading={loading}
      error={error}
      artifacts={data}
    />
  )
}

export default EnhancedArtifactsSection
