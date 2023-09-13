import React from 'react'
import { ThemeProvider } from '@mui/material'
import { THEMES, LIGHT_THEME } from './theme'
import { StyledEngineProvider } from '@mui/material/styles'

const ThemeProviderWrapper = props => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={THEMES[LIGHT_THEME]}>{props.children}</ThemeProvider>
  </StyledEngineProvider>
)

export default ThemeProviderWrapper
