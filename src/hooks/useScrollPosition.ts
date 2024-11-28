import { useState, useEffect } from 'react'

export const useScrollPosition = () => {
  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50) // You can adjust this value
    }

    window.addEventListener('scroll', handleScroll)
    
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isTop
} 