import CancelSubmit from '../../../components/student/studentAssignmentDetails-components/cancelSubmit/CancelSubmit';
import CommentSection from '../../../components/student/studentAssignmentDetails-components/commentSection/CommentSection';
import AssignmentHeader from '../../../components/student/studentAssignmentDetails-components/header/AssignmentHeader'
import UploadFile from '../../../components/student/studentAssignmentDetails-components/uploadFile/UploadFile';
import UpperHeader from '../../../components/student/studentAssignmentDetails-components/upperHeader/UpperHeader';
const StudentAssignmentDetails = () => {
  return (
   <div className="min-h-screen bg-gray-50">
      <UpperHeader />

      <div className="max-w-4xl mx-auto p-6">
        <AssignmentHeader />
        <UploadFile />
        <CommentSection />
        <CancelSubmit hasFiles={false} />
      </div>
    </div>

  )
}

export default StudentAssignmentDetails
