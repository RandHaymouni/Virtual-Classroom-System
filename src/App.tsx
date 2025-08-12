import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/auth/login/Login'
import SignUp from './pages/auth/signUp/SignUp'
import StudentViewClass from './pages/student/StudentViewClass/StudentViewClass'
import JoinClass from './pages/student/joinClass/JoinClass'
import StudentAssignmentDetails from './pages/student/studentAssignmentDetails/StudentAssignmentDetails'
import StudentDashboard from './pages/student/studentDashboard/StudentDashboard'
import TeacherViewClass from './pages/teacher/TeacherViewClass/TeacherViewClass'
import CreateAssignments from './pages/teacher/createAssignments/CreateAssignments'
import CreateClass from './pages/teacher/createClass/CreateClass'
import TeacherAssignmentDetails from './pages/teacher/teacherAssignmentDetails/TeacherAssignmentDetails'
import TeacherDashboard from './pages/teacher/teacherDashboard/TeacherDashboard'
import MainLayout from './layouts/MainLayout'
import ViewAssignmentsDetails from './components/teacher/createAssignments-components/viewAssignments/viewAssignmentsDetails/ViewAssignmentsDetails'
import LandingPage from './pages/landingPage/LandingPage'
import ProtectedRoute from './protectedRouter/ProtectedRouter'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/studentDashboard' element={
          <ProtectedRoute allowedRoles={['student']}>
            <MainLayout><StudentDashboard /></MainLayout>
          </ProtectedRoute>
        } />
        <Route path='/joinClass' element={
          <ProtectedRoute allowedRoles={['student']}>
            <MainLayout><JoinClass /></MainLayout>
          </ProtectedRoute>
        } />
        < Route path='/studentAssignmentDetails' element={
          < ProtectedRoute allowedRoles={['student']}>
            <MainLayout><StudentAssignmentDetails /></MainLayout>
          </ProtectedRoute>
        } />
        < Route path='/StudentViewClass/:id' element={
          < ProtectedRoute allowedRoles={['student']}>
            <MainLayout><StudentViewClass /></MainLayout>
          </ProtectedRoute>
        } />
        < Route path='/teacherDashboard' element={
          < ProtectedRoute allowedRoles={['teacher']}>
            <MainLayout><TeacherDashboard /></MainLayout>
          </ProtectedRoute>
        } />
        < Route path='/createAssignments/:id' element={
          < ProtectedRoute allowedRoles={['teacher']}>
            <MainLayout><CreateAssignments /></MainLayout>
          </ProtectedRoute>
        } />
        < Route path='/createClass' element={
          < ProtectedRoute allowedRoles={['teacher']}>
            <MainLayout><CreateClass /></MainLayout>
          </ProtectedRoute>
        } />
        < Route path='/teacherAssignmentDetails' element={
          < ProtectedRoute allowedRoles={['teacher']}>
            <MainLayout><TeacherAssignmentDetails /></MainLayout>
          </ProtectedRoute>
        } />
        < Route path='/class/:id' element={
          < ProtectedRoute allowedRoles={['teacher']}>
            <MainLayout><TeacherViewClass /></MainLayout>
          </ProtectedRoute>
        } />
        < Route path='/viewAssignmentsDetails' element={
          < ProtectedRoute allowedRoles={['teacher']}>
            <MainLayout><ViewAssignmentsDetails /></MainLayout>
          </ProtectedRoute>
        } />
      </Routes >
    </BrowserRouter >
  )
}

export default App
