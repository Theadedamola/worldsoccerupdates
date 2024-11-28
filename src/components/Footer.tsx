import { Facebook, Instagram } from 'iconsax-react'
import { Link } from 'react-router-dom'
import logo from '../assets/Layer 5 1.png'

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="" className="w-16 h-16" />
            </Link>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
            <Link to="/" className="hover:text-green-200 transition-colors">
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-green-200 transition-colors"
            >
              About Us
            </Link>
            <Link to="/shop" className="hover:text-green-200 transition-colors">
              Shop
            </Link>
            <Link to="/blog" className="hover:text-green-200 transition-colors">
              Blog
            </Link>
            <Link
              to="/categories"
              className="hover:text-green-200 transition-colors"
            >
              Categories
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-200 transition-colors"
            >
              <Facebook className="w-6 h-6" variant="Bold" />
            </a>
            {/* <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-200 transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a> */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-200 transition-colors"
            >
              <Instagram className="w-6 h-6" variant="Bold" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} WSU. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
