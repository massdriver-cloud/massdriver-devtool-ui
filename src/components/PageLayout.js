import { useState } from 'react'
import stylin from '../utils/stylin'

import Header from './Header'
import ConnectionsView from './ConnectionsView.container'
import Form from './Form'

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

  fetch('http://127.0.0.1:8080/schema-connections.json')
    .then(json => json.json())
    .then(data => console.log)

  return (
    <PageContainer>
      <Header currentTabId={tab} onTabClick={onTabChange} tabs={TABS} />
      {TabComponent ? (
        <TabComponent />
      ) : (
        <p>Error</p>
      )}
      <Form
        schema={{
          "$schema": "http://json-schema.org/draft-07/schema",
          "type": "object",
          "title": "Add Service Account",
          "description": "Create and manage Massdriver service accounts to delegate machine access to Massdriver's cli tool. External systems can use them to do things, like having your CI publish bundles.",
          "required": ["name"],
          "properties": {
            "name": {
              "type": "string",
              "title": "Name",
              "description": "A user friendly name for this service account.",
              "examples": ["Github Actions", "Gitlab CI/CD"]
            },
            "locations": {
              "type": "string",
              "title": "Name",
              "description": "A user friendly name for this service account.",
              "examples": ["Github Actions", "Gitlab CI/CD"]
            }
          }
        }}
        uiSchema={{
          name: {
            "ui:field": "dnsZonesDropdown",
            "cloud": "aws"
          },
          locations: {
            "ui:field": "supportedCloudLocationsDropdown",
            "cloudService": "aws"
          }
        }}
      />
    </PageContainer>
  )
}

export default PageLayout

const PageContainer = stylin(Box)({
  width: '100%',
  mx: 'auto'
})
