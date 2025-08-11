import CancelSubmit from '../../../components/student/studentAssignmentDetails-components/cancelSubmit/CancelSubmit';
import CommentSection from '../../../components/student/studentAssignmentDetails-components/commentSection/CommentSection';
import AssignmentHeader from '../../../components/student/studentAssignmentDetails-components/header/AssignmentHeader'
import UploadFile from '../../../components/student/studentAssignmentDetails-components/uploadFile/UploadFile';
import UpperHeader from '../../../components/student/studentAssignmentDetails-components/upperHeader/UpperHeader';
import classes from './studentAssignmentDetails.module.css'

const StudentAssignmentDetails = () => {
  return (
   <div className={classes.contener}>
      <UpperHeader />
        <AssignmentHeader />
        <UploadFile />
        <CommentSection />
        <CancelSubmit hasFiles={false} />
    </div>

  )
}

export default StudentAssignmentDetails
