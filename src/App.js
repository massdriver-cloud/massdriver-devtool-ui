import React from 'react'
import './styles/globals.css'
import './styles/markdown.css'

import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from './theme/ThemeProvider'
import RouteController from './pages/RouteController'
import AuthProvider from './contexts/authContext'

// Snackbar
import { SnackbarProvider } from 'notistack'
import BasicSnackbar from './components/BasicSnackbar'

const SNACKBAR_VARIANT_MAP = {
  success: BasicSnackbar,
  error: BasicSnackbar,
  warning: BasicSnackbar,
  info: BasicSnackbar
}

function App() {

  return (
    <ThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <SnackbarProvider Components={SNACKBAR_VARIANT_MAP}>
          <RouteController />
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
