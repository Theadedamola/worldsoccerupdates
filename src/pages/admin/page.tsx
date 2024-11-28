import { Outlet } from "react-router-dom"
import Navbar from "../../components/NavbarAuth"

const AdminPage = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}
export default AdminPage