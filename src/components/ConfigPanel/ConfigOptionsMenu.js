import { useEffect, useState, useRef } from 'react'
import stylin from 'utils/stylin'
import { NO_PRESET_SELECTED } from 'components/ConfigPanel/constants'

import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CheckIcon from '@mui/icons-material/Check'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

const DEFAULT_ICON_STYLES = { width: '24px', height: '24px' }

export default ({
  presetOptions = [],
  selectedPreset,
  isExpandedView,
  onClick,
  sx,
  className
}) => {
  const [open, setMenuOpen] = useState(false)
  const anchorRef = useRef(null)
  const prevOpen = useRef(open)

  // return focus to the button when we transitioned from !open -> open
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  const handleToggle = () => {
    setMenuOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setMenuOpen(false)
  }

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setMenuOpen(false)
    } else if (event.key === 'Escape') {
      setMenuOpen(false)
    }
  }

  return (
    <div>
      <ConfigMenuButton
        variant='outlined'
        color='primary'
        ref={anchorRef}
        id='config-options-button'
        size='small'
        aria-controls={open ? 'config-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={sx}
        className={className}
      >
        Config options
      </ConfigMenuButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        style={{ zIndex: 2000 }}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'left top'
            }}
          >
            <Paper sx={{ borderRadius: '4px' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='config-options-menu'
                  aria-labelledby='config-options-button'
                  onKeyDown={handleListKeyDown}
                  sx={{ px: 0, py: '8px' }}
                >
                  <Typography
                    sx={{
                      fontSize: '13px',
                      fontWeight: 500,
                      lineHeight: '150%',
                      letterSpacing: '0.15px',
                      px: '16px',
                      height: '20px'
                    }}
                  >
                    Fill in form with preset data...
                  </Typography>
                  {presetOptions.map(({ label, value }) => (
                    <PresetMenuItem
                      key={value}
                      id='preset-option'
                      label={label}
                      value={value}
                      selected={selectedPreset === value}
                      onClick={onClick}
                    />
                  ))}
                  <Divider />
                  <ExpandedViewMenuItem
                    id='expand-option'
                    isExpandedView={isExpandedView}
                    onClick={onClick}
                    disabled={selectedPreset === NO_PRESET_SELECTED}
                  />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

const ConfigMenuButton = stylin(Button)({
  fontWeight: 400,
  borderRadius: '4px',
  fontSize: '13px'
})

const PresetMenuItem = stylin(({ label, selected, ...props }) => (
  <MenuItem selected={selected} {...props}>
    {selected === true && (
      <ListItemIcon>
        <CheckIcon sx={DEFAULT_ICON_STYLES} />
      </ListItemIcon>
    )}
    <ListItemText
      inset={!selected}
      sx={{
        span: {
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '150%',
          letterSpacing: '0.15px'
        }
      }}
    >
      {label}
    </ListItemText>
  </MenuItem>
))(() => ({
  py: '6px',
  px: '16px',
  height: '36px',
  '&:hover': {
    borderRadius: 0
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent'
  },
  '&.MuiTouchRipple-root': {
    borderRadius: 0
  }
}))

const ExpandedViewMenuItem = stylin(({ isExpandedView, ...props }) => (
  <MenuItem selected={isExpandedView} {...props}>
    <ListItemIcon>
      {isExpandedView ? (
        <VisibilityOffOutlinedIcon sx={DEFAULT_ICON_STYLES} />
      ) : (
        <VisibilityOutlinedIcon sx={DEFAULT_ICON_STYLES} />
      )}
    </ListItemIcon>
    <ListItemText
      sx={{
        span: {
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '150%',
          letterSpacing: '0.15px'
        }
      }}
    >
      {isExpandedView ? 'Hide ' : 'Show '} data set by preset
    </ListItemText>
  </MenuItem>
))(() => ({
  py: '6px',
  px: '16px',
  height: '36px',
  '&:hover': {
    borderRadius: 0
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent'
  },
  '&.MuiTouchRipple-root': {
    borderRadius: 0
  }
}))
