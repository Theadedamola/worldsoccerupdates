import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  adminOnly?: boolean
}

export const ProtectedRoute = ({ adminOnly = false }: ProtectedRouteProps) => {
  const { user, isAdmin, logout } = useAuth()

  // Check for token in localStorage
  const token = localStorage.getItem('token')

  // If no user or no token, redirect to login
  if (!user || !token) {
    logout() // Clear any potentially stale state
    return <Navigate to="/login" />
  }

  // If admin-only route and user is not an admin, redirect
  if (adminOnly && !isAdmin) return <Navigate to="/admin" />

  return <Outlet />
}
