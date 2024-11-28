import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  adminOnly?: boolean
}

export const ProtectedRoute = ({ adminOnly = false }: ProtectedRouteProps) => {
  const { user, isAdmin } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (adminOnly && !isAdmin) return <Navigate to="/admin" />
  return <Outlet />
} 