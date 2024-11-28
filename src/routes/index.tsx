import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import App from '../App'
import AddNominee from '../components/AddNominee'
import AdminDashboard from '../components/AdminDashboard'
import AdminLogin from '../components/AdminLogin'
import AlreadyVoted from '../components/AlreadyVoted'
import Categories from '../components/Categories'
import Login from '../components/Login'
import Register from '../components/Register'
import RegisterSuccess from '../components/RegisterSuccess'
import VotingPage from '../components/VotingPage'
import AddUser from '../components/AddUser'
import AddCategory from '../components/AddCategory'
import LandingPage from '../pages/Landing'
import Webpage from '../pages/page'
import AdminPage from '../pages/admin/page'
import UserPage from '../pages/user/page'
import EmptyPage from '../components/EmptyPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Webpage />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'register-success',
            element: <RegisterSuccess />,
          },
          {
            path: 'admin',
            element: <AdminLogin />,
          },
        ],
      },

      {
        element: <ProtectedRoute adminOnly />,
        children: [
          {
            path: '',
            element: <AdminPage />,
            children: [
              {
                path: 'admin/dashboard',
                element: <AdminDashboard />,
              },
              {
                path: 'add-user',
                element: <AddUser />,
              },
              {
                path: 'add-nominee',
                element: <AddNominee />,
              },
              {
                path: 'add-category',
                element: <AddCategory />,
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <UserPage />,
            children: [
              {
                path: 'categories',
                element: <Categories />,
              },
              {
                path: 'vote/:category',
                element: <VotingPage />,
              },
              {
                path: 'already-voted',
                element: <AlreadyVoted />,
              },
            ],
          },
        ],
      },
      { path: '*', element: <EmptyPage /> },
    ],
  },
])
