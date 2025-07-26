import UpperHeader from '../../../components/teacher/teacherAssignmentDetails-components/upperHeader/UpperHeader'
import Header from '../../../components/teacher/teacherAssignmentDetails-components/header/Header.tsx'
import classes from './teacherAssignmentsDetails.module.css'
import StdSubmissions from '../../../components/teacher/teacherAssignmentDetails-components/stdSubmissions/StdSubmissionsTable.tsx'
import SubmitSummary from '../../../components/teacher/teacherAssignmentDetails-components/submitSummary/SubmitSummary.tsx'
const TeacherAssignmentDetails = () => {
    return (
        <span className={classes.pageContainer}>
            <UpperHeader dueDate='July,18,2025' />
            <span className={classes.container}>
                <Header
                    type='Assignment'
                    title='React Quiz'
                    description='Design a simple React component that displays a list of items. Use props and state to manage the list, and style it using CSS modules.'
                    points='100 Points'
                    dueDate='June, 5'
                />
                <span className={classes.summaryContainer}>
                    <SubmitSummary title='Submissions' count={18} total={32} />
                    <SubmitSummary title='Graded' count={8} total={10} />
                    <SubmitSummary title='Time Remaining' count={18} dueDate="July 15, 2025" />
                </span>
      
                <StdSubmissions />
            </span>
        </span>
    )
}

export default TeacherAssignmentDetails
