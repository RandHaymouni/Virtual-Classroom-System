import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from "./pages/auth/login/Login"
import SignUp from "./pages/auth/signUp/SignUp"
import StudentViewClass from "./pages/student/StudentViewClass/StudentViewClass"
import JoinClass from "./pages/student/joinClass/JoinClass"
import StudentAssignmentDetails from "./pages/student/studentAssignmentDetails/StudentAssignmentDetails"
import StudentDashboard from "./pages/student/studentDashboard/StudentDashboard"
import TeacherViewClass from "./pages/teacher/TeacherViewClass/TeacherViewClass"
import CreateAssignments from "./pages/teacher/createAssignments/CreateAssignments"
import CreateClass from "./pages/teacher/createClass/CreateClass"
import TeacherAssignmentDetails from "./pages/teacher/teacherAssignmentDetails/TeacherAssignmentDetails"
import TeacherDashboard from "./pages/teacher/teacherDashboard/TeacherDashboard"
import MainLayout from './layouts/MainLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path="/studentDashboard" element={<MainLayout><StudentDashboard /></MainLayout>} />
        <Route path="/joinClass" element={<MainLayout><JoinClass /></MainLayout>} />
        <Route path="/studentAssignmentDetails" element={<MainLayout><StudentAssignmentDetails /></MainLayout>} />
        <Route path="/StudentViewClass" element={<MainLayout><StudentViewClass /></MainLayout>} />
        <Route path="/teacherDashboard" element={<MainLayout><TeacherDashboard /></MainLayout>} />
        <Route path="/createAssignments" element={<MainLayout><CreateAssignments /></MainLayout>} />
        <Route path="/createClass" element={<MainLayout><CreateClass /></MainLayout>} />
        <Route path="/teacherAssignmentDetails" element={<MainLayout><TeacherAssignmentDetails /></MainLayout>} />
        <Route path="/class/:id" element={<MainLayout><TeacherViewClass /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
