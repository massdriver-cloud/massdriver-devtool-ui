import React from 'react'
import PropTypes from 'prop-types'
import stylin from '../../utils/stylin'

import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

const PresetsBar = ({
  value,
  onChange,
  presetsMenuData,
  allFieldsToggled,
  onToggleAllFieldsChange
}) => (
  <Container>
    <PresetDropdownContainer className='tour-configuration-presets'>
      <Title>Configuration Preset:</Title>
      <PresetsDropdown
        size='small'
        id='preset-configuration'
        value={value}
        onChange={onChange}
        SelectProps={{
          renderValue: value =>
            value === ''
              ? 'None'
              : presetsMenuData?.find(item => item?.value === value)?.label,
          displayEmpty: true
        }}
        select
      >
        {presetsMenuData?.map(item => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </PresetsDropdown>
    </PresetDropdownContainer>

    <Tooltip
      title={value === '-1' ? 'Select a preset to hide advanced fields.' : ''}
      PopperProps={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -14]
            }
          }
        ]
      }}
    >
      <span>
        <AdvancedFieldsButton
          onClick={onToggleAllFieldsChange}
          disabled={value === '-1'}
        >
          {`${allFieldsToggled ? 'Hide' : 'Show'} Advanced Fields`}
        </AdvancedFieldsButton>
      </span>
    </Tooltip>
  </Container>
)

PresetsBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  presetsMenuData: PropTypes.array,
  allFieldsToggled: PropTypes.bool,
  onToggleAllFieldsChange: PropTypes.func
}

export default PresetsBar

const PresetDropdownContainer = stylin('div')({
  display: 'inline-block',
  '.MuiInput-root': { marginLeft: '24px' },
  backgroundColor: '#f5f5fa'
})

const Title = stylin(Typography)({
  display: 'inline-block',
  verticalAlign: 'middle',
  fontWeight: 'bold',
  mr: 2
})

const PresetsDropdown = stylin(TextField)({
  display: 'inline-block',
  verticalAlign: 'middle',
  '& .MuiOutlinedInput-root': {
    maxWidth: '305px'
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
})

const Container = stylin(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: '3%',
})

const AdvancedFieldsButton = stylin(Button)({
  color: '#000',
  fontWeight: 'normal',
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'underline',
    backgroundColor: 'rgba(34, 51, 84, 0.05)',
    borderRadius: '3px'
  }
})
