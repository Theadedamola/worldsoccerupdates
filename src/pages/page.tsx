import { Outlet } from 'react-router-dom'
import Navbar from '.././components/Navbar'

const Webpage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
export default Webpage
