import CancelSubmit from '../../../components/student/studentAssignmentDetails-components/cancelSubmit/CancelSubmit';
import CommentSection from '../../../components/student/studentAssignmentDetails-components/commentSection/CommentSection';
import AssignmentHeader from '../../../components/student/studentAssignmentDetails-components/header/AssignmentHeader'
import classes from '../../../components/student/studentAssignmentDetails-components/header/assignmentHeader.module.css'
import UploadFile from '../../../components/student/studentAssignmentDetails-components/uploadFile/UploadFile';
import UpperHeader from '../../../components/student/studentAssignmentDetails-components/upperHeader/UpperHeader';
const StudentAssignmentDetails = () => {
  return (
    <>
      <UpperHeader />
      <div className={classes.container}>
        < AssignmentHeader assignmentStatus="Graded"
          title="React Component Development Assignment"
          points={100}
          dueDate="July 15, 2025"
          description="Create a responsive React component using TypeScript and CSS modules. The component should handle user interactions and display assignment status dynamically."
          onBackClick={() => {
            console.log("Navigate back to assignments list");
          }} />

        <UploadFile />
        <CommentSection />
        <CancelSubmit />
      </div>

    </>

  )
}

export default StudentAssignmentDetails
