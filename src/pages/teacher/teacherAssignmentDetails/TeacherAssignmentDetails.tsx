import UpperHeader from "../../../components/teacher/teacherAssignmentDetails-components/upperHeader/UpperHeader"
import Header from "../../../components/teacher/teacherAssignmentDetails-components/header/Header"
import SubmitSummary from "../../../components/teacher/teacherAssignmentDetails-components/submitSummary/SubmitSummary"
import StdSubmissionsTable from "../../../components/teacher/teacherAssignmentDetails-components/stdSubmissions/StdSubmissionsTable"
import styles from "./teacherAssignmentsDetails.module.css"

// Mock data for the assignment
const assignmentData = {
    type: "Final Project",
    title: "Building a Web Application",
    points: "100 points",
    dueDate: "Due May 25, 2025 at 11:59 PM",
    description:
        "Create a full-stack web application using the technologies we've learned throughout the semester. Your application should demonstrate your understanding of front-end development, back-end integration, and database management.",
}

// Mock student data
const studentData = [
    {
        id: 1,
        name: "Emma Johnson",
        submissionDate: "May 24, 2025 - 10:23 AM",
        status: "Submitted",
    },
    {
        id: 2,
        name: "Michael Chen",
        submissionDate: "May 23, 2025 - 3:45 PM",
        status: "Submitted",
    },
    {
        id: 3,
        name: "Sophia Rodriguez",
        submissionDate: "May 22, 2025 - 7:12 PM",
        status: "Submitted",
    },
    {
        id: 4,
        name: "James Wilson",
        submissionDate: null,
        status: "Not Submitted",
    },
    {
        id: 5,
        name: "Olivia Smith",
        submissionDate: null,
        status: "Not Submitted",
    },
]

// Calculate days remaining
const calculateDaysRemaining = (dueDate: string): number => {
    const due = new Date("2025-10-25T23:59:00")
    const today = new Date()
    const timeDiff = due.getTime() - today.getTime()
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
}

export default function AssignmentPage() {
    const daysRemaining = calculateDaysRemaining(assignmentData.dueDate)
    const submittedCount = studentData.filter((s) => s.status === "Submitted").length
    const totalStudents = studentData.length
    const gradedCount = 0 // No students graded yet

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <UpperHeader daysRemaining={daysRemaining} />
                <Header assignmentData={assignmentData} />
                <SubmitSummary
                    submittedCount={submittedCount}
                    totalStudents={totalStudents}
                    gradedCount={gradedCount}
                    daysRemaining={daysRemaining}
                />
                <StdSubmissionsTable studentData={studentData} />
            </div>
        </div>
    )
}
