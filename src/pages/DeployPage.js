import Typography from "@mui/material/Typography"
import Custom404 from "components/Custom404"
const DeployPage = () => {
  return (
    <Custom404>
      <Typography sx={{ fontSize: "4rem", fontWeight: "bold" }}>404</Typography>
      <Typography variant="h1">Page not found</Typography>
    </Custom404>
  )
}

export default DeployPage
