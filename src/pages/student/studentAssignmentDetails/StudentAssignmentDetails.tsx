import CancelSubmit from '../../../components/student/studentAssignmentDetails-components/cancelSubmit/CancelSubmit';
import CommentSection from '../../../components/student/studentAssignmentDetails-components/commentSection/CommentSection';
import AssignmentHeader from '../../../components/student/studentAssignmentDetails-components/header/AssignmentHeader'
import classes from './StudentAssignmentDetails.module.css';
import UploadFile from '../../../components/student/studentAssignmentDetails-components/uploadFile/UploadFile';
import UpperHeader from '../../../components/student/studentAssignmentDetails-components/upperHeader/UpperHeader';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface IAssignment {
  title: string;
  type: string;
  points: number;
  dueDate: string;
  description: string;
  class: string;
  teacher: string;
  // attachments: string[]; 
  status: "Submitted" | "Not Submitted" | "Graded"; 
}
const StudentAssignmentDetails = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  
  if (!assignmentId) {
    return <div>Error: Assignment ID not found</div>;
  }
  const [assignment, setAssignment] = useState<IAssignment>({
    title: '',
    type: '',
    points: 0,
    dueDate: '',
    description: '',
    class: '',
    teacher: '',
    status: "Not Submitted"
  });

  const { handleSubmit, cancelSub, isUploaded, uploadFileComponent } = UploadFile(assignmentId);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await fetch(`http://localhost:5173/studentAssignmentDetails/${assignmentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        if (!res.ok) throw new Error('Failed to fetch assignment');
        const data = await res.json();
        setAssignment(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssignment();
  }, [assignmentId]);
  return (
    <>
      <UpperHeader assignmentStatus={assignment.status} />
      <div className={classes.container}>
        < AssignmentHeader assignmentStatus={assignment.status}
          title={assignment.title}
          points={assignment.points}
          dueDate={assignment.dueDate}
          description={assignment.description}
        />
        {uploadFileComponent}
        <CommentSection />
        {assignment?.status === "Not Submitted" &&
          <CancelSubmit isUploaded={isUploaded} handleCancel={cancelSub} handleSubmit={handleSubmit}/>
        }
      </div>
    </>

  )
}

export default StudentAssignmentDetails
