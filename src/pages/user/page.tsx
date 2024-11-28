import { Outlet } from 'react-router-dom'
import Navbar from '../../components/NavbarAuth'

const UserPage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
export default UserPage
