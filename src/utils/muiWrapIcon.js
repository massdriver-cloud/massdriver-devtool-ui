import SvgIcon from '@mui/material/SvgIcon'

const muiWrapIcon = (Component, initialProps) => props =>
  <SvgIcon component={Component} inheritViewBox {...initialProps} {...props} />

export default muiWrapIcon
