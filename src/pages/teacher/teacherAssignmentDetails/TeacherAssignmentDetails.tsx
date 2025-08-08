import UpperHeader from '../../../components/teacher/teacherAssignmentDetails-components/upperHeader/UpperHeader'
import Header from '../../../components/teacher/teacherAssignmentDetails-components/header/Header.tsx'
import classes from './teacherAssignmentsDetails.module.css'
import StdSubmissions from '../../../components/teacher/teacherAssignmentDetails-components/stdSubmissions/StdSubmissionsTable.tsx'
import SubmitSummary from '../../../components/teacher/teacherAssignmentDetails-components/submitSummary/SubmitSummary.tsx'
import { useEffect, useState } from "react";
import { type IAssignment, defaultAssignment } from './types.ts';
import { useParams } from 'react-router-dom'
const TeacherAssignmentDetails = () => {
    const { id: assignmentId } = useParams<{ id: string }>();
    const [assignment, setAssignment] = useState<IAssignment>(defaultAssignment);
    useEffect(() => {
        fetch(`http://localhost:5000/teacherAssignmentDetails/:${assignmentId}`)
            .then(res => res.json())
            .then(data => {
                setAssignment(data);
            })
            .catch(err => {
                console.error("Error fetching assignment:", err);
            });
    }, [assignmentId]);
    return (
        <span className={classes.pageContainer}>
            <UpperHeader dueDate={assignment?.dueDate} />
            <span className={classes.container}>
                <Header
                    type='Assignment'
                    title={assignment?.name}
                    description={assignment?.description}
                    points={`${assignment?.points} Points`}
                    dueDate={assignment?.dueDate}
                />
                <span className={classes.summaryContainer}>
                    <SubmitSummary title='Submissions' count={assignment?.submissions.length} total={assignment?.submissions.length} />
                    <SubmitSummary title='Graded' count={assignment?.submissions.filter(sub => sub.status === "Graded").length} total={assignment?.submissions.length} />
                    <SubmitSummary title='Time Remaining' dueDate={assignment?.dueDate} />
                </span>

                <StdSubmissions />
            </span>
        </span>
    )
}

export default TeacherAssignmentDetails
