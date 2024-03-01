import ConnectionsSection from 'components/ConnectionsSection/ConnectionsSection'
import useGetSchemaConnections from 'hooks/queries/useGetSchemaConnections'

const EnhancedConnectionsSection = () => {
  const { data, loading, error } = useGetSchemaConnections()

  return (
    <ConnectionsSection
      loading={loading}
      error={error}
      credentialConnections={data?.credentialConnections}
      normalConnections={data?.normalConnections}
    />
  )
}

export default EnhancedConnectionsSection
