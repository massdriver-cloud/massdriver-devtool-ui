import PropTypes from 'prop-types'
import stylin from '../../utils/stylin'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LineItem from './LineItem'
import LoadingSpinner from '../LoadingSpinner'
import { getStatusColor } from '../ResourceProgressViewer/helpers'
import {
  DEPLOYMENT_STATUS_ICONS_WITH_COLOR,
  PROVISION
} from '../Icons/status-icons'

const ErrorIconDot = DEPLOYMENT_STATUS_ICONS_WITH_COLOR[PROVISION.FAILED]

const ResourceLineItem = ({ resource, deploymentStatus }) =>
  resource.type ? (
    <LineItem resource={resource} deploymentStatus={deploymentStatus} />
  ) : (
    <>
      {Object.keys(resource).map((resourceKey, index) => (
        <LineItem
          key={resourceKey}
          resource={resource[resourceKey]}
          deploymentStatus={deploymentStatus}
          index={index}
        />
      ))}
    </>
  )

const ResourceProgressViewer = ({
  formattedAction,
  action,
  resources,
  deploymentStatus = '',
  customEmptyState,
  onErrorClick,
  showViewCanvasButton,
  onViewCanvasClick,
  viewCanvasHref,
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
        {deploymentStatus === 'INITIALIZED' && customEmptyState?.action
          ? customEmptyState?.action
          : `${(formattedAction || '')?.toLowerCase()} Resources`}
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
        ...(deploymentStatus === 'COMPLETED'
          ? {
            opacity: '0.6',
            transition: 'opacity 1s ease-out'
          }
          : {})
      }}
    >
      {resources && deploymentStatus !== 'FAILED' ? (
        Object.keys(resources).map(resourceKey => (
          <ResourceLineItem
            key={resourceKey}
            resource={resources[resourceKey]}
            deploymentStatus={deploymentStatus}
          />
        ))
      ) : (
        <MessageContainer>
          {deploymentStatus === 'COMPLETED' ? (
            <SuccessMessage>{`${action}ing Complete`}</SuccessMessage>
          ) : deploymentStatus === 'FAILED' ? (
            <ErrorContainer>
              <PrimaryErrorMessage>{`${action} Failed`}</PrimaryErrorMessage>
              <br />
              <br />
              {onErrorClick && (
                <>
                  <Button
                    variant='outlined'
                    onClick={onErrorClick}
                    sx={{ color: 'white', borderColor: 'white' }}
                  >
                    View Error Details
                  </Button>
                  <br />
                  <br />
                </>
              )}
              <Message>
                {onErrorClick && (
                  <>
                    The button above will show you the errors that just ocurred.{' '}
                  </>
                )}
                To find the errors on the canvas later, simply locate the{' '}
                <ErrorIcon /> icon on the node.
              </Message>
              <br />
              <br />
              <NodeImage />
              <br />
              <br />
              {(viewCanvasHref || onViewCanvasClick) && showViewCanvasButton && (
                <ErrorButton
                  variant='contained'
                  onClick={onViewCanvasClick}
                  href={viewCanvasHref}
                >
                  View Canvas
                </ErrorButton>
              )}
            </ErrorContainer>
          ) : deploymentStatus === 'INITIALIZED' ? (
            <>
              <PrimaryNothingMessage>
                {customEmptyState?.status || 'Initialized'}
              </PrimaryNothingMessage>
              {!customEmptyState?.status && (
                <SecondaryNothingMessage>
                  This package has never been deployed.
                </SecondaryNothingMessage>
              )}
            </>
          ) : (
            <LoadingSpinner delay='600' />
          )}
        </MessageContainer>
      )}
    </Box>
  </Box>
)

ResourceProgressViewer.propTypes = {
  packageId: PropTypes.string
}

export default ResourceProgressViewer

const SuccessMessage = stylin(Typography)({
  mt: '20px',
  fontSize: '2rem',
  color: 'primary.main',
  textAlign: 'center',
  textTransform: 'capitalize'
})

const ErrorContainer = stylin(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const PrimaryErrorMessage = stylin(Typography)({
  mt: '20px',
  fontSize: '2rem',
  color: 'error.main',
  textAlign: 'center',
  textTransform: 'capitalize'
})

const Message = stylin(Typography)({
  textAlign: 'left',
  mt: '10px',
  fontSize: '1rem',
  color: '#ccc',
  px: '20px',
  WebkitFontSmoothing: 'subpixel-antialiased'
})

const PrimaryNothingMessage = stylin(Typography)({
  mt: '20px',
  fontSize: '2rem',
  color: 'info.main',
  textAlign: 'center',
  textTransform: 'capitalize'
})

const SecondaryNothingMessage = stylin(Typography)({
  textAlign: 'center',
  mt: '10px',
  fontSize: '1rem',
  color: 'info.light'
})

const MessageContainer = stylin(Box)({
  px: '20px'
})

const ErrorButton = stylin(Button)({
  mt: '20px'
})

const NodeImageContainer = stylin(Box)({
  width: '210px',
  border: 'solid 2px white',
  padding: '30px',
  background: '#e3efff',
  borderRadius: '5px'
})

const NodeImage = () => (
  <NodeImageContainer>
    <img
      src='/node-error-thumbnail.svg'
      alt='error in diagram'
      style={{
        width: '100%',
        filter: 'drop-shadow(2px 2px 4px rgb(84,128,187, 0.2))'
      }}
    />
  </NodeImageContainer>
)

const ErrorIcon = () => (
  <Box
    sx={{
      display: 'inline-block',
      position: 'relative',
      top: '3px',
      margin: '0 3px'
    }}
  >
    <Box
      sx={{
        background: 'white',
        width: '19px',
        height: '19px',
        top: '3px',
        left: '3px',
        borderRadius: '50%'
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        top: '-3px',
        left: '-3px'
      }}
    >
      <ErrorIconDot />
    </Box>
  </Box>
)
