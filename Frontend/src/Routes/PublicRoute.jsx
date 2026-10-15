import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/authContext'

const PublicRoute = ({ children }) => {

  const { user, loading } = useAuth()

  if (loading) {
    return <p>Loading...</p>
  }

  if (user) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default PublicRoute