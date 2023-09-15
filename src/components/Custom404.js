import Stack from '@mui/material/Stack'
import logo from '../../public/assets/logo-black.svg'

const Custom404 = ({ small, children, sx, ...props }) => (
  <Stack
    direction='row'
    alignItems='center'
    justifyContent='center'
    spacing={2}
    sx={{
      height: small ? '250px' : '80vh',
      marginTop: small ? '100px' : 0,
      px: '50px',
      ...sx
    }}
    {...props}
  >
    <img
      src={logo}
      alt='space-man'
      width='67px'
      height='74px'
      style={{
        width: small ? '120px' : '300px',
        height: small ? '120px' : '300px'
      }}
    />
    <Stack justifyContent='center' alignItems='start'>
      {children}
    </Stack>
  </Stack>
)

export default Custom404
