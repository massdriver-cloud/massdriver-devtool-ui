import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getStatusColor } from '../ResourceProgressViewer/helpers'
import LogViewer from 'components/LogViewer'

const ResourceProgressViewer = ({
  formattedAction,
  action,
  resources,
  deploymentStatus = '',
  sx,
  ...props
}) => (
  <Box
    sx={{
      display: 'flex',
      flexFlow: 'column',
      backgroundColor: 'black',
      height: '100%',
      ...sx
    }}
    {...props}
  >
    <Box
      padding='12px 12px 12px 12px'
      borderBottom='1px solid #323232'
      sx={{ whiteSpace: 'nowrap', textAlign: 'left' }}
    >
      <Typography
        variant='h5'
        style={{
          color: '#c5c5c5',
          display: 'inline-block',
          textTransform: 'capitalize'
        }}
      >
        {' '}
        {`${(formattedAction || '')?.toLowerCase()} Resources`}
      </Typography>
      <Typography
        variant='h5'
        style={{
          color: getStatusColor(deploymentStatus.toLowerCase()),
          float: 'right',
          display: 'inline-block'
        }}
      >
        {' '}
        {deploymentStatus.split('_').join(' ')}
      </Typography>
    </Box>
    <Box
      display='flex'
      flex='1'
      flexDirection='column'
      sx={{
        ...(deploymentStatus === 'COMPLETED' || deploymentStatus === 'FAILED'
          ? {
            opacity: '0.6',
            transition: 'opacity 1s ease-out'
          }
          : {}),
      }}
    >
      <LogViewer
        data={resources?.join('\n')}
        scrollToRow={resources?.length}
      />
    </Box>
  </Box>
)

ResourceProgressViewer.propTypes = {
  packageId: PropTypes.string
}

export default ResourceProgressViewer
