import UpperHeader from '../../../components/teacher/teacherAssignmentDetails-components/upperHeader/UpperHeader'
import Header from '../../../components/teacher/teacherAssignmentDetails-components/header/Header.tsx'
import classes from './teacherAssignmentsDetails.module.css'
import StdSubmissions from '../../../components/teacher/teacherAssignmentDetails-components/stdSubmissions/StdSubmissionsTable.tsx'
import SubmitSummary from '../../../components/teacher/teacherAssignmentDetails-components/submitSummary/SubmitSummary.tsx'
const TeacherAssignmentDetails = () => {
    return (
        <>
            <UpperHeader dueDate='July,18,2025' />
            <span className={classes.container}>
                <Header title='Assignment' description='Lorem ipsum dolor sit, amet consectetur adipisicing elit.' points='100' dueDate='June,5' />
                <span className={classes.summaryContainer}>
                    <SubmitSummary title='Submissions' count={18} total={32} />
                    <SubmitSummary title='Graded' count={8} total={10} />
                    <SubmitSummary title='Time Remaining' count={18} dueDate="July 15, 2025" />
                </span>
                
                <StdSubmissions />
            </span>
        </>
    )
}

export default TeacherAssignmentDetails
