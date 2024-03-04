import stylin from 'utils/stylin'

import Custom404 from 'components/Custom404'

// Pages
import ViewPage from 'pages/ViewPage'
import DeployPage from 'pages/DeployPage'
// Layouts
import JustHeaderLayout from 'components/layouts/JustHeaderLayout'


import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ROUTE_MAPS = {
  '/': {
    page: ViewPage,
    layout: JustHeaderLayout,
  },
  '/deploy': {
    page: DeployPage,
  }
}

const RouteController = () => {
  const currentRoute = window?.location?.pathname

  const Page = ROUTE_MAPS[currentRoute]?.page
  const Layout = ROUTE_MAPS[currentRoute]?.layout

  return Page ? (
    <PageContainer>
      {Layout ? (
        <Layout>
          <Page />
        </Layout>
      ) : (
        <Page />
      )}
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
