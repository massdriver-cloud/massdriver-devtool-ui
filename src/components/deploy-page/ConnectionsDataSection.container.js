
import ConnectionsDataSection from 'components/deploy-page/ConnectionsDataSection'
import useGetSavedConnections from 'hooks/queries/useGetSavedConnections'

const EnhancedConnectionsDataSection = ({ }) => {
  const { data, loading, error } = useGetSavedConnections()

  return (
    <ConnectionsDataSection
      loading={loading}
      error={error}
      credentials={data?.credentials}
      normal={data?.normal}
    />
  )
}

export default EnhancedConnectionsDataSection
