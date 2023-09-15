import stylin from '../utils/stylin'

import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

const TabButtons = ({ currentTabId, onTabClick, tabs }) => (
  <TabsContainer elevation={1} square>
    {tabs.map(tab => (
      <Tooltip
        title={tab.tooltip || ''}
        key={tab.id}
      >
        <span>
          <TabButton
            id={tab.id}
            onClick={onTabClick}
            selected={currentTabId === tab.id}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabButton>
        </span>
      </Tooltip>
    ))}
  </TabsContainer>
)

export default TabButtons

const TabsContainer = stylin(Paper)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  pt: '20px',
  px: '60px',
  pb: '12px',
  flexWrap: 'flex'
})

const TabButton = stylin(Button, ['selected'])(props => ({
  background: props.variant === 'contained' ? undefined : 'transparent',
  color: props.variant === 'contained' ? 'primary' : 'black',
  mr: 2,
  mb: 1,
  ...(props.selected ? {
    backgroundColor: 'primary.light'
  } : {})
}))
