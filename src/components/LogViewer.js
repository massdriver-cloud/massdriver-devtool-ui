import { LogViewer as BaseLogViewer } from '@patternfly/react-log-viewer'
import "@patternfly/react-core/dist/styles/base.css"
import "assets/fonts.css"


const LogViewer = ({ data = '', ...props }) => (
  <BaseLogViewer
    theme='dark'
    hasLineNumbers={false}
    height='100%'
    data={`\n${data}\n`}
    {...props}
  />
)

export default LogViewer
