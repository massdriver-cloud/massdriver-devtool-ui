import stylin from '../utils/stylin'
import ViewPage from './ViewPage'
import DeployPage from './DeployPage'
import Custom404 from '../components/Custom404'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ROUTE_MAPS = {
  '/': ViewPage,
  '/deploy': DeployPage
}

const RouteController = () => {
  const currentRoute = window?.location?.pathname

  const Page = ROUTE_MAPS[currentRoute]

  return Page ? (
    <PageContainer>
      <Page />
    </PageContainer>
  ) : (
    <Custom404>
      <Typography sx={{ fontSize: '4rem', fontWeight: 'bold' }}>404</Typography>
      <Typography variant='h1'>Page not found</Typography>
    </Custom404>
  )
}

export default RouteController

const PageContainer = stylin(Box)({
  width: '100%',
  mx: 'auto',
  height: '100%'
})
