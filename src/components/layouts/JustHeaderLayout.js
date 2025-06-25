import Header from "components/Header"

import Box from "@mui/material/Box"
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
      <Header></Header>
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
