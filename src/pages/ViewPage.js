import stylin from '../utils/stylin'

import TabButtons from '../components/TabButtons'
import ConnectionsView from '../components/ConnectionsView.container'
import FormView from '../components/FormView.container'
import SecretsView from '../components/SecretsView/SecretsView.container'

import Button from '@mui/material/Button'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

const TAB_COMPONENTS = {
  "1": ConnectionsView,
  "2": SecretsView,
  "3": FormView
}

const TABS = [
  {
    id: "1",
    label: "Connections",
  },
  {
    id: "2",
    label: "Secrets",
  },
  {
    id: "3",
    label: "Form",
  }
]

const ViewPage = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const currentTabId = TABS?.find(tab => tab.label.toLowerCase() === urlParams.get('tab'))?.id

  const onTabChange = event => document.location = `?tab=${TABS.find(tab => tab.id === event.target.id).label.toLowerCase()}`

  const TabComponent = TAB_COMPONENTS[currentTabId] || ConnectionsView

  return (
    <>
      <TabButtons currentTabId={currentTabId} onTabClick={onTabChange} tabs={TABS} />
      <DeployButton
        variant="contained"
        endIcon={<ArrowRightIcon sx={{ width: '25px', height: '25px' }} />}
        href='/deploy'
      >
        Provision Bundle
      </DeployButton>
      {TabComponent ? (
        <TabComponent />
      ) : (
        <p>Error</p>
      )}
    </>
  )
}

export default ViewPage

const DeployButton = stylin(Button)({
  position: 'absolute',
  top: 20,
  right: 30
})
