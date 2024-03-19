import useGetContainerInfo from 'hooks/queries/useGetContainerInfo'
import FailInfo from 'components/deploy-page/FailInfo'

const EnhancedFailInfo = ({ containerId }) => {
  const { data, loading, error } = useGetContainerInfo({ containerId })


  return (
    <FailInfo
      loading={loading}
      error={error}
      containerName={data?.name}
      containerId={containerId}
    />
  )
}

export default EnhancedFailInfo
