import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { useSelectedPath } from '../context/PathContext'
import {
  Menu,
  X,
  Home,
  Info,
  ShoppingCart,
  FileText,
  LogIn,
} from 'lucide-react'
import logo from '../assets/Layer 5.png'

export default function Navbar() {
  const navigate = useNavigate()
  const isTop = useScrollPosition()
  const { selectedPath } = useSelectedPath()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About Us', icon: Info },
    { to: '/store', label: 'Store', icon: ShoppingCart },
    { to: '/blog', label: 'Blog', icon: FileText },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isTop ? 'bg-transparent' : 'bg-white shadow-sm'}`}
    >
      <div className="max-w-7xl mx-auto relative z-40 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="" className="w-10 h-10" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`transition-colors ${
                    isTop && selectedPath
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Login Button */}
          <div className="hidden md:block">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md transition-colors ${
                isTop ? 'text-green-600' : 'text-green-600'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 pt-16 z-30 left-0 right-0 bg-white shadow-lg">
          <ul className="flex flex-col items-start p-4 space-y-4">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <li key={to} className="w-full">
                <Link
                  to={to}
                  onClick={toggleMenu}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded-md"
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
            <li className="w-full pt-2 border-t">
              <button
                onClick={() => {
                  navigate('/login')
                  toggleMenu()
                }}
                className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded-md text-green-600"
              >
                <LogIn size={20} />
                <span>Login</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
