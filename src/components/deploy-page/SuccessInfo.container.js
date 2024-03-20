import useGetContainerInfo from 'hooks/queries/useGetContainerInfo'
import SuccessInfo from 'components/deploy-page/SuccessInfo'

const EnhancedSuccessInfo = ({ containerId, artifacts }) => {
  const { data, loading, error } = useGetContainerInfo({ containerId })

  return (
    <SuccessInfo
      loading={loading}
      error={error}
      containerName={data?.name}
      containerId={containerId}
      artifacts={artifacts}
    />
  )
}

export default EnhancedSuccessInfo
