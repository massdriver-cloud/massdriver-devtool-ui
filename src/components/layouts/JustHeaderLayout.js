/**
 * Must define the layout for any page requiring login. For now this only adds
 * the side bar, header bar, paper cups chat widget, and the context drawer.
 */

import Header from 'components/Header'
import Box from '@mui/material/Box'

const JustHeaderLayout = ({ children }) => (
  <>
    <Box
      width='100%'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <Header />
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 69px)',
          overflowX: 'hidden',
          overflowY: 'scroll'
        }}
      >
        {children}
      </Box>
    </Box>
  </>
)

export default JustHeaderLayout
