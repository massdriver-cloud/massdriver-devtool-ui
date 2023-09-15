import stylin from '../utils/stylin'

import TabButtons from './TabButtons'
import ConnectionsView from './ConnectionsView.container'
import FormView from './FormView.container'

import Box from '@mui/material/Box'

const TAB_COMPONENTS = {
  "1": ConnectionsView,
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

const PageLayout = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const currentTabId = TABS?.find(tab => tab.label.toLowerCase() === urlParams.get('tab'))?.id

  const onTabChange = event => document.location = `?tab=${TABS.find(tab => tab.id === event.target.id).label.toLowerCase()}`

  const TabComponent = TAB_COMPONENTS[currentTabId] || ConnectionsView

  return (
    <PageContainer>
      <TabButtons currentTabId={currentTabId} onTabClick={onTabChange} tabs={TABS} />
      {TabComponent ? (
        <TabComponent />
      ) : (
        <p>Error</p>
      )}
    </PageContainer>
  )
}

export default PageLayout

const PageContainer = stylin(Box)({
  width: '100%',
  mx: 'auto'
})
