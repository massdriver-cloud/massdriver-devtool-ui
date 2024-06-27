import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getStatusColor } from '../ResourceProgressViewer/helpers'
import LogViewer from 'components/LogViewer'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const ResourceProgressViewer = ({
  formattedAction,
  action,
  resources,
  deploymentStatus = '',
  onClose,
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
      sx={{
        whiteSpace: 'nowrap',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography
        variant='h5'
        style={{
          color: '#c5c5c5',
          textTransform: 'capitalize'
        }}
      >
        {' '}
        {`${(formattedAction || '')?.toLowerCase()} Resources`}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        <Typography
          variant='h5'
          style={{
            color: getStatusColor(deploymentStatus.toLowerCase()),
          }}
        >
          {' '}
          {deploymentStatus.split('_').join(' ')}
        </Typography>
        {onClose && (
          <IconButton
            onClick={onClose}
            sx={{
              p: '0px',
              color: 'rgb(197, 197, 197)'
            }}
          >

            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </Box>
    <Box
      display='flex'
      flex='1'
      flexDirection='column'
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
