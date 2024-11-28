import { useNavigate } from 'react-router-dom'
import { Trophy } from 'lucide-react'
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { db } from '../firebase'

interface Category {
  id: string
  name: string
  slug: string
}

export default function Categories() {
  const navigate = useNavigate()
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

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto pt-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium text-gray-900">
            Vote Categories
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const Icon = Trophy
            return (
              <button
                key={category.id}
                onClick={() => navigate(`/vote/${category.slug}`)}
                className="border border-gray-200 p-6 rounded-xl hover:shadow-[0px_4px_40px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex items-center gap-4"
              >
                <div className="p-3 bg-green-100 rounded-lg">
                  <Icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-medium text-gray-900">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm">
                    Click to cast your vote
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
