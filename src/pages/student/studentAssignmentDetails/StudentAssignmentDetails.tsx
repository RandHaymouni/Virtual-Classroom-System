import CancelSubmit from '../../../components/student/studentAssignmentDetails-components/cancelSubmit/CancelSubmit';
import CommentSection from '../../../components/student/studentAssignmentDetails-components/commentSection/CommentSection';
import AssignmentHeader from '../../../components/student/studentAssignmentDetails-components/header/AssignmentHeader'
import classes from './StudentAssignmentDetails.module.css';
import UploadFile from '../../../components/student/studentAssignmentDetails-components/uploadFile/UploadFile';
import UpperHeader from '../../../components/student/studentAssignmentDetails-components/upperHeader/UpperHeader';
const isSubmitted: boolean = false;
const StudentAssignmentDetails = () => {
  const { cancelSub, isUploaded, uploadFileComponent } = UploadFile();
  return (
    <>
      <UpperHeader assignmentStatus={isSubmitted ? "Submitted" : "Not Submitted"} />
      <div className={classes.container}>
        < AssignmentHeader assignmentStatus="Graded"
          title="React Component Development Assignment"
          points={100}
          dueDate="July 15, 2025"
          description="Create a responsive React component using TypeScript and CSS modules. The component should handle user interactions and display assignment status dynamically."
        />
        {uploadFileComponent}
        <CommentSection />
        {!isSubmitted &&
          <CancelSubmit isUploaded={isUploaded} handleCancel={cancelSub} />
        }
      </div>
    </>

  )
}

export default StudentAssignmentDetails
