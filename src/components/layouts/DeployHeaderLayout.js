/**
 * Must define the layout for any page requiring login. For now this only adds
 * the side bar, header bar, paper cups chat widget, and the context drawer.
 */
// import stylin from 'utils/stylin'
import Header from "components/Header"

import Box from "@mui/material/Box"
// import Button from '@mui/material/Button'
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'

const DeployHeaderLayout = ({ children }) => (
  <>
    <Box
      width="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Header>
        {/* <DeployButton
        variant="outlined"
        startIcon={<ArrowLeftIcon sx={{ width: '25px', height: '25px' }} />}
        href='/'
      >
        Back to app
      </DeployButton> */}
      </Header>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 69px)",
          overflowX: "hidden",
          overflowY: "scroll",
        }}
      >
        {children}
      </Box>
    </Box>
  </>
)

export default DeployHeaderLayout

// const DeployButton = stylin(Button)({
//   borderRadius: '4px',
//   color: 'white'
// })
