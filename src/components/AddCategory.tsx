import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { db } from '../firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import toast from 'react-hot-toast'

export default function AddCategory() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const navigate = useNavigate()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    setSlug(newName.toLowerCase().replace(/\s+/g, '-'))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const categoriesRef = collection(db, 'categories')
      const q = query(categoriesRef, where('slug', '==', slug))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        toast.error('Category already exists')
        return
      }

      await addDoc(collection(db, 'categories'), {
        name,
        slug,
        createdAt: new Date().toISOString(),
      })

      toast.success('Category added successfully')
      setName('')
      setSlug('')
    } catch (error) {
      console.error('Add category error:', error)
      toast.error('Failed to add category')
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

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Add New Category
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  )
}
