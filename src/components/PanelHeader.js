import stylin from '../utils/stylin'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Header = ({ label = '', subLabel = '', ...props }) => (
  <HeaderContainer {...props}>
    <Title>{label}</Title>
    <Typography variant='subtitle1'>{subLabel}</Typography>
  </HeaderContainer>
)

export default Header

const HeaderContainer = stylin(Box)({
  py: '20px',
  px: '50px',
  borderBottom: 'solid 1px #e1e1e1',
  paddingBottom: '20px',
  textAlign: 'left'
})

const Title = stylin(Typography)({
  fontSize: '28px',
  fontWeight: 400
})
