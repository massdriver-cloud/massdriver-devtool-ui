import stylin from 'utils/stylin'

import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

const AlertBanner = ({
  severity = 'info',
  header,
  description,
  children,
  sx,
  className
}) => (
  <StyledAlert severity={severity} sx={sx} className={className}>
    {children || (
      <>
        <Header>{header}</Header>
        <Description variant='subtitle2'>{description}</Description>
      </>
    )}
  </StyledAlert>
)

export default AlertBanner

const StyledAlert = stylin(Alert)({
  mt: '20px'
})

const Header = stylin(Typography)({
  fontSize: '13px',
  fontWeight: 'bold'
})

const Description = stylin(Typography)({
  fontSize: '12px',
  lineHeight: '1rem',
  mt: '2px'
})
