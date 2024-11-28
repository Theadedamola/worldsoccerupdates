import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelectedPath } from './PathContext'

const LocationListener: React.FC = () => {
  const location = useLocation()
  const { setSelectedPath } = useSelectedPath()

  useEffect(() => {
    const pathsToWatch = ['/', '/about', '/shop', '/blog']
    if (pathsToWatch.includes(location.pathname)) {
      setSelectedPath(location.pathname)
    }
  }, [location, setSelectedPath])

  return null
}

export default LocationListener
