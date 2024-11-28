import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { db } from '../firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import toast from 'react-hot-toast'

export default function AddUser() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('username', '==', username))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        toast.error('Username already exists')
        return
      }

      await addDoc(collection(db, 'users'), {
        username,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      })

      toast.success('User added successfully')
      setUsername('')
    } catch (error) {
      console.error('Add user error:', error)
      toast.error('Failed to add user')
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto pt-16">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New User</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter username"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  )
}
