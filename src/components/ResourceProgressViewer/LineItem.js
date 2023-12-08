import { getStatusColor, resourceNameOrEllipsis } from './helpers'
import ProgressIndicator from './ProgressIndicator'
import PropTypes from 'prop-types'

import { Box, Typography } from '@mui/material'

const LineItem = ({ resource, index, deploymentStatus }) => (
  <Box display='flex' padding='12px 12px 0 12px' alignItems='center'>
    <Box flexGrow='4'>
      <Typography
        style={{
          color: getStatusColor(resource.status)
        }}
      >
        {resourceNameOrEllipsis(resource, index)}
      </Typography>
    </Box>
    <Box>
      <Typography
        style={{
          color: getStatusColor(resource.status)
        }}
      >
        {resource.status}
      </Typography>
    </Box>
    <ProgressIndicator
      status={resource.status}
      deploymentStatus={deploymentStatus}
    />
  </Box>
)

LineItem.propTypes = {
  resource: PropTypes.object,
  index: PropTypes.number
}

export default LineItem
