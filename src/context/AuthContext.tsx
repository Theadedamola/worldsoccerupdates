import React, { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'

interface AuthContextType {
  user: string | null
  isAdmin: boolean
  login: (username: string, password?: string) => Promise<boolean>
  logout: () => void
  register: (username: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Validate token on initial load
  useEffect(() => {
    const validateStoredUser = async () => {
      const storedUser = localStorage.getItem('user')
      const storedIsAdmin = localStorage.getItem('isAdmin')
      const token = localStorage.getItem('token')

      if (storedUser && token) {
        try {
          // Verify the user exists in Firestore
          const usersRef = collection(db, 'users')
          const q = query(
            usersRef,
            where('username', '==', storedUser),
            where('isAdmin', '==', storedIsAdmin === 'true')
          )

          const querySnapshot = await getDocs(q)

          if (!querySnapshot.empty) {
            // User verified, restore authentication state
            setUser(storedUser)
            setIsAdmin(storedIsAdmin === 'true')
          } else {
            // Invalid stored user, clear localStorage
            logout()
          }
        } catch (error) {
          console.error('User validation error:', error)
          logout()
        } finally {
          setIsLoading(false)
        }
      } else {
        // No stored authentication
        setIsLoading(false)
      }
    }

    validateStoredUser()
  }, [])

  const login = async (username: string, password?: string) => {
    try {
      const usersRef = collection(db, 'users')
      const q = password
        ? query(
            usersRef,
            where('username', '==', username),
            where('password', '==', password),
            where('isAdmin', '==', true)
          )
        : query(
            usersRef,
            where('username', '==', username),
            where('isAdmin', '==', false)
          )

      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        // Generate a token (you might want to use a more secure method in production)
        const token = btoa(`${username}:${Date.now()}`)

        // Set user in state
        setUser(username)
        setIsAdmin(!!password)

        // Save to localStorage
        localStorage.setItem('user', username)
        localStorage.setItem('isAdmin', String(!!password))
        localStorage.setItem('token', token)

        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (username: string) => {
    try {
      // Check if username already exists
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('username', '==', username))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        return false // Username already exists
      }

      // Add new user
      await addDoc(collection(db, 'users'), {
        username,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      })

      // Generate a token
      const token = btoa(`${username}:${Date.now()}`)

      // Set user in state
      setUser(username)
      setIsAdmin(false)

      // Save to localStorage
      localStorage.setItem('user', username)
      localStorage.setItem('isAdmin', 'false')
      localStorage.setItem('token', token)

      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = () => {
    // Clear user from state
    setUser(null)
    setIsAdmin(false)

    // Remove from localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('token')
  }

  // If loading, you might want to show a loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
