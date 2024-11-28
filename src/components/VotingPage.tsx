import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { ChevronLeft, User2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Nominee {
  id: string;
  name: string;
  description: string;
}

export default function VotingPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        if (!category) return;
        
        const nomineesRef = collection(db, 'nominees');
        const q = query(nomineesRef, where('category', '==', category));
        const querySnapshot = await getDocs(q);
        
        const nomineesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Nominee[];
        
        setNominees(nomineesData);
      } catch (error) {
        console.error('Error fetching nominees:', error);
        toast.error('Failed to load nominees');
      } finally {
        setLoading(false);
      }
    };

    fetchNominees();
  }, [category]);

  const handleVote = async (nomineeId: string) => {
    if (!user || !category) return;

    try {
      // Check if user has already voted
      const votesRef = collection(db, 'votes');
      const q = query(
        votesRef, 
        where('category', '==', category),
        where('username', '==', user)
      );
      const voteSnapshot = await getDocs(q);

      if (!voteSnapshot.empty) {
        toast.error('You have already voted in this category');
        navigate('/already-voted');
        return;
      }

      // Record the vote
      await addDoc(votesRef, {
        category,
        nomineeId,
        username: user,
        timestamp: new Date().toISOString()
      });

      toast.success('Vote recorded successfully!');
      navigate('/already-voted');
    } catch (error) {
      console.error('Error submitting vote:', error);
      toast.error('Failed to submit vote');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto pt-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Categories
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {category
            ?.split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nominees.map((nominee) => (
            <div
              key={nominee.id}
              className="border border-gray-200 hover:shadow-[0px_4px_40px_rgba(0,0,0,0.08)] rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <User2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {nominee.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{nominee.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleVote(nominee.id)}
                className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Vote for {nominee.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}