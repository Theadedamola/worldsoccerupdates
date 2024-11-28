import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function RegisterSuccess() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Registration Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Your account has been created successfully. Voting link will be hared
          when its time to vote
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
