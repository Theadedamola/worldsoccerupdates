import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { ChevronLeft } from 'lucide-react'
import toast from 'react-hot-toast'

interface Category {
  id: string
  name: string
  slug: string
}

export default function AddNominee() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
  })
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories')
        const snapshot = await getDocs(categoriesRef)
        const categoriesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[]
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error)
        toast.error('Failed to load categories')
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'nominees'), {
        ...formData,
        createdAt: new Date().toISOString(),
      })
      toast.success('Nominee added successfully')
      setFormData({ name: '', description: '', category: '' })
    } catch (error) {
      console.error('Error adding nominee:', error)
      toast.error('Failed to add nominee')
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
          Add New Nominee
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Add Nominee
          </button>
        </form>
      </div>
    </div>
  )
}
