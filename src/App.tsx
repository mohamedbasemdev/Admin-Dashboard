
import { Route, Routes } from 'react-router-dom'
// import { Box } from "@mui/material"

// import SideBar from './global/SideBar'
// import TopHeader from './global/TopHeader'
import Team from './team'
import Contacts from './contacts'
import Invoices from './invoices'
import Form from './form'
import CalendarComponent from './calendar'
import FAQ from './faq'
import Bar from './bar'
import Pie from './pie'
import Line from './line'
import Geography from './geography'
import Dashboard from './dashboard'
import DashboardLayout from './component/DashboardLayout'
import ProtectedRoute from './component/ProtectedRoute'
import Login from './login'
import Register from './register/Index'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<ProtectedRoute>
          <DashboardLayout>
            <Routes>
              <Route path='/' element={<Dashboard />} />
        <Route path='/team' element={<Team />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/invoices' element={<Invoices />} />
        <Route path='/form' element={<Form />} />
        <Route path='/calendar' element={<CalendarComponent />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/bar' element={<Bar />} />
        <Route path='/pie' element={<Pie />} />
        <Route path='/line' element={<Line />} />
        <Route path='/geography' element={<Geography />} />
            </Routes>
          </DashboardLayout>
        </ProtectedRoute>} />
        
      </Routes>
    </>
  )
}

export default App
