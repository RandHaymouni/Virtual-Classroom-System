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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/joinClass' element={<JoinClass />} />
        <Route path='/studentAssignmentDetails' element={<StudentAssignmentDetails />} />
        <Route path='/studentDashboard' element={<StudentDashboard />} />
        <Route path='/StudentViewClass' element={<StudentViewClass />} />
        <Route path='/createAssignments' element={<CreateAssignments />} />
        <Route path='/createClass' element={<CreateClass />} />
        <Route path='/teacherAssignmentDetails' element={<TeacherAssignmentDetails />} />
        <Route path='/teacherDashboard' element={<TeacherDashboard />} />
        <Route path='/TeacherViewClass' element={<TeacherViewClass />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
