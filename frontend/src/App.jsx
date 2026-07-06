import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Auth
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'

// User pages
import Home from './components/Home'
import Jobs from './components/Jobs.jsx'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import AIAssistant from "./pages/AIAssistant";
// Admin pages
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
// import AIChat from './components/AIChat'
import TestResume from "./TestResume";
import Chat from './pages/Chat.jsx'

import TestAI from "./pages/TestAI";
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },

{
  path: "/test-ai",
  element: <TestAI />
},
{
  path: "/test-resume",
  element: <TestResume />
},
{
  path: "/ai-assistant",
  element: <AIAssistant />
},
  {
    path: "/chat/:receiverId",
    element: <ProtectedRoute><Chat /></ProtectedRoute>
  },

  // Admin
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
