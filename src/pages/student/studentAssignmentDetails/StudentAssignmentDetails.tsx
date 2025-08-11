import { useState } from "react";
import CancelSubmit from '../../../components/student/studentAssignmentDetails-components/cancelSubmit/CancelSubmit';
import CommentSection from '../../../components/student/studentAssignmentDetails-components/commentSection/CommentSection';
import AssignmentHeader from '../../../components/student/studentAssignmentDetails-components/header/AssignmentHeader';
import UploadFile from '../../../components/student/studentAssignmentDetails-components/uploadFile/UploadFile';
import UpperHeader from '../../../components/student/studentAssignmentDetails-components/upperHeader/UpperHeader';
import classes from './studentAssignmentDetails.module.css';

const StudentAssignmentDetails = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const assignmentId = "abc123"; // مثال، استبدله بالقيمة الصحيحة

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("comments", comments);
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/submission", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || "Failed to submit");
      } else {
        alert("Submission successful!");
        setSelectedFiles([]);
        setComments("");
      }
    } catch {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classes.contener}>
      <UpperHeader />
      <AssignmentHeader />
      <UploadFile selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
      <CommentSection comments={comments} setComments={setComments} />
      <CancelSubmit hasFiles={selectedFiles.length > 0} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default StudentAssignmentDetails;
