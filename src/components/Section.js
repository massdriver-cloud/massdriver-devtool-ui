import stylin from 'utils/stylin'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const Section = ({ title, description, children, sx, className }) => (
  <SectionContainer sx={sx} className={className}>
    <Header className="section-header">
      <Title className="section-title">{title}</Title>
      <Description className="section-description">{description}</Description>
    </Header>
    <Divider className="section-divider" />
    {children}
  </SectionContainer>
)

export default Section

const SectionContainer = stylin(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: '4px'
}))

const Header = stylin(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  p: '12px'
}))

const Title = stylin(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.grey[900],
  fontWeight: 500,
}))

const Description = stylin(Typography)(({ theme }) => ({
  fontSize: '11px',
  color: theme.palette.grey[700],
  lineHeight: 1
}))
