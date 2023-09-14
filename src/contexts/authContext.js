import { createContext, useContext } from 'react'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const AuthProvider = props => {

  const value = {
    organizationId: '90ea395a-235c-4138-8c29-768422c8b443',
    serviceAccountId: 'b4YqmStsYKunUvpYwWqRUu/5htiUJPcehF1lvQuL5DYuJ9fcr6K+bio+HapiI5wXMydyywPER5zElVCxMMMR4A=='
  }

  return (
    <AuthContext.Provider value={value} {...props} />
  )
}

export default AuthProvider
