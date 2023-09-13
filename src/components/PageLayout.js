import { useState } from 'react'
import stylin from '../utils/stylin'

import Header from './Header'
import ConnectionsView from './ConnectionsView.container'

import Box from '@mui/material/Box'

const TAB_COMPONENTS = {
  "1": ConnectionsView
}

const TABS = [
  {
    id: "1",
    label: "Connections"
  },
  {
    id: "2",
    label: "Secrets"
  },
  {
    id: "3",
    label: "Form",
    disabled: true,
    tooltip: 'Please configure bundle connections before entering form view.'
  }
]

const PageLayout = () => {
  const [tab, setTab] = useState("1")

  const onTabChange = event => setTab(event.target.id)

  const TabComponent = TAB_COMPONENTS[tab]

  return (
    <PageContainer>
      <Header currentTabId={tab} onTabClick={onTabChange} tabs={TABS} />
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
