import AssignmentHeader from '../../../components/student/studentAssignmentDetails-components/header/AssignmentHeader'

const StudentAssignmentDetails = () => {
  return (
    <>
      < AssignmentHeader assignmentStatus= "Graded"
      title= "React Component Development Assignment"
      points={100}
      dueDate= "July 15, 2025"
      description= "Create a responsive React component using TypeScript and CSS modules. The component should handle user interactions and display assignment status dynamically."
     onBackClick={() => {
        console.log("Navigate back to assignments list");
      }}

      />
    </>
  )
}

export default StudentAssignmentDetails
