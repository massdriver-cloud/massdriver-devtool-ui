/**
 * Must define the layout for any page requiring login. For now this only adds
 * the side bar, header bar, paper cups chat widget, and the context drawer.
 */
import stylin from "utils/stylin"
import Header from "components/Header"

import Box from "@mui/material/Box"
// import Button from "@mui/material/Button"
// import ArrowRightIcon from "@mui/icons-material/ArrowRight"

const JustHeaderLayout = ({ children }) => (
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
          endIcon={<ArrowRightIcon sx={{ width: '25px', height: '25px' }} />}
          href='/deploy'
        >
          Provision Bundle
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

export default JustHeaderLayout

// const DeployButton = stylin(Button)({
//   borderRadius: "4px",
//   color: "white",
// })
