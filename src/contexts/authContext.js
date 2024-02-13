import { createContext, useContext } from 'react'
import useFetch from '../hooks/useFetch'
import LoadingSpinner from '../components/LoadingSpinner'
import Custom404 from '../components/Custom404'

import Typography from '@mui/material/Typography'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children, ...props }) => {
  const { data, loading, error } = useFetch('http://127.0.0.1:8080/config')

  const credentials = {
    organizationId: data?.orgID,
    serviceAccountId: data?.apiKey
  }

  return (
    <AuthContext.Provider value={credentials} {...props}>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Custom404>
          <Typography variant='h3'>
            CLI variables not found
          </Typography>
          <Typography variant='h6'>
            We encountered an issue parsing your CLI's variables. Please ensure you have both <pre style={{ display: 'inline' }}>MASSDRIVER_ORG_ID</pre> and <pre style={{ display: 'inline' }}>MASSDRIVER_API_KEY</pre> set and the cli server running.
          </Typography>
        </Custom404>
      ) : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
