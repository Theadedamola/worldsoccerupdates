import { useNavigate, Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useScrollPosition } from '../hooks/useScrollPosition'
import logo from '../assets/Layer 5.png'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const isTop = useScrollPosition()

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isTop ? 'bg-transparent' : 'bg-white shadow-sm'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className={`text-2xl font-bold transition-colors ${
                isTop ? 'text-white' : 'text-green-600'
              }`}
            >
              <img src={logo} alt="" className="w-32 h-32" />
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            {user && (
              <div className="flex gap-4 items-center">
                <p className="text-gray-600">Welcome, {user}</p>
                <button
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors text-red-600 hover:text-red-700`}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
