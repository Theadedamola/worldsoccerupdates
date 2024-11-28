import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Users, UserPlus, ListPlus } from 'lucide-react'
import toast from 'react-hot-toast'

interface VoteStats {
  category: Category
  nominees: {
    name: string
    votes: number
    percentage: number
  }[]
}

interface Nominee {
  id: string
  name: string
  category: string
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [voteStats, setVoteStats] = useState<VoteStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVoteStats()
  }, [])

  const fetchVoteStats = async () => {
    try {
      const votesRef = collection(db, 'votes')
      const nomineesRef = collection(db, 'nominees')
      const categoriesRef = collection(db, 'categories')

      const [votesSnapshot, nomineesSnapshot, categoriesSnapshot] =
        await Promise.all([
          getDocs(votesRef),
          getDocs(nomineesRef),
          getDocs(categoriesRef),
        ])

      const votes = votesSnapshot.docs.map((doc) => doc.data())
      const nominees = nomineesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Nominee[]

      const stats: VoteStats[] = []
      const categories = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[]

      categories.forEach((category) => {
        const categoryVotes = votes.filter(
          (vote) => vote.category.slug === category.slug
        )
        const categoryNominees = nominees.filter(
          (nominee) => nominee.category === category.slug
        )
        const totalVotes = categoryVotes.length

        const nomineeStats = categoryNominees.map((nominee) => {
          const nomineeVotes = categoryVotes.filter(
            (vote) => vote.nomineeId === nominee.id
          ).length
          return {
            name: nominee.name,
            votes: nomineeVotes,
            percentage: totalVotes ? (nomineeVotes / totalVotes) * 100 : 0,
          }
        })

        stats.push({
          category,
          nominees: nomineeStats,
        })
      })

      setVoteStats(stats)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching vote stats:', error)
      toast.error('Failed to load statistics')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium text-gray-900">
            Admin Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <button
            onClick={() => navigate('/add-user')}
            className="p-6 flex gap-2 border border-gray-200 rounded-xl hover:shadow-[0px_4px_40px_rgba(0,0,0,0.08)] transition-shadow"
          >
            <UserPlus className="w-5 h-5" />
            <div className="flex flex-col gap-2 items-start">
              <h2 className="text-xl font-medium">Add New User</h2>
              <p className="text-gray-600 text-sm">
                Create new user accounts for voting
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/add-nominee')}
            className="p-6 flex gap-2 border border-gray-200 rounded-xl hover:shadow-[0px_4px_40px_rgba(0,0,0,0.08)] transition-shadow"
          >
            <UserPlus className="w-5 h-5" />
            <div className="flex flex-col gap-2 items-start">
              <h2 className="text-xl font-medium">Add New Nominee</h2>
              <p className="text-gray-600 text-sm">
                Add new nominees to voting categories
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/add-category')}
            className="p-6 flex gap-2 border border-gray-200 rounded-xl hover:shadow-[0px_4px_40px_rgba(0,0,0,0.08)] transition-shadow"
          >
            <ListPlus className="w-5 h-5" />
            <div className="flex flex-col gap-2 items-start">
              <h2 className="text-xl font-medium">Add New Category</h2>
              <p className="text-gray-600 text-sm">
                Create new voting categories
              </p>
            </div>
          </button>
        </div>

        <div className="p-6 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Voting Statistics
          </h2>
          {voteStats.map((stat) => (
            <div key={stat.category.slug} className="mb-8">
              <h3 className="text-lg font-medium mb-4 capitalize">
                {stat.category.slug.split('-').join(' ')}
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stat.nominees}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="percentage" name="Vote %" fill="#15803d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
