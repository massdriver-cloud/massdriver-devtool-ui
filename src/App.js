import React from 'react'
import './styles/globals.css'
import './styles/markdown.css'

import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from './theme/ThemeProvider'
import PageLayout from './components/PageLayout'
import AuthProvider from './contexts/authContext'

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <PageLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
