
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronLeft } from 'lucide-react';

export default function AlreadyVoted() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Voting!</h1>
        <p className="text-gray-600 mb-8">
          You have already cast your vote in this category. Each user can only vote once per category.
        </p>
        <button
          onClick={() => navigate('/categories')}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mx-auto"
        >
          <ChevronLeft className="w-5 h-5" />
          Return to Categories
        </button>
      </div>
    </div>
  );
}