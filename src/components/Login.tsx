import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Vote } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Login() {
  const [username, setUsername] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(username)
    if (success) {
      navigate('/categories')
    } else {
      toast.error('User not found in the system')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-200 p-8 rounded-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Vote className="w-16 h-16 text-green-600 mb-4" />
          <h1 className="text-3xl font-medium text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            Please enter your name to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Sign In
          </button>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-green-600 hover:text-green-700"
            >
              Register New Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
