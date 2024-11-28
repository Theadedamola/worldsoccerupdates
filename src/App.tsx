import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Footer from './components/Footer'
import ScrollToTop from './hooks/ScrollToTop'
import { SelectedPathProvider } from './context/PathContext'
import LocationListener from './context/LocationListener'

function App() {
  return (
    <AuthProvider>
      <SelectedPathProvider>
        <LocationListener />
        <ScrollToTop />
        <div className="">
          <Outlet />
          <Footer />
          <Toaster position="top-center" />
        </div>
      </SelectedPathProvider>
    </AuthProvider>
  )
}

export default App
