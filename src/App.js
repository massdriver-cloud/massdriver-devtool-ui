import React from 'react'
import './styles/globals.css'
import './styles/markdown.css'

import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from './theme/ThemeProvider'
import PageLayout from './components/PageLayout'

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <PageLayout />
    </ThemeProvider>
  );
}

export default App;
