import stylin from 'utils/stylin'
import Typography from '@mui/material/Typography'

const LinearHeaderLogo = ({ className, ...restProps }) => (
  <Typography
    variant='h6'
    color='white'
    display='flex'
    alignItems='center'
    {...restProps}
  >
    <LogoImage
      className={className}
      src='assets/massdriver-logo-white-for-dark-bg.svg'
      alt='Massdriver'
    />
  </Typography>
)

export default LinearHeaderLogo

const LogoImage = stylin('img')({
  marginLeft: '10px',
  marginRight: '12px',
  width: '169px',
  height: '45px'
})
