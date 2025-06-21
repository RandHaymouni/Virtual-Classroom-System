import { Plus, ExternalLink, Clock, CheckCircle } from "lucide-react"
import styles from "./assignmentsTab.module.css"

interface AssignmentsTabProps {
    classId: string
}

const mockAssignments = [
    {
        id: 1,
        title: "Final Project: Building a Web Application",
        type: "Project",
        points: 100,
        dueDate: "May 25, 2025 at 11:59 PM",
        submitted: 18,
        total: 32,
        status: "Active",
        avgScore: null,
    },
    {
        id: 2,
        title: "Quiz #3: JavaScript Fundamentals",
        type: "Quiz",
        points: 50,
        dueDate: "May 17, 2025 at 11:59 PM",
        submitted: 32,
        total: 32,
        status: "Graded",
        avgScore: { current: 43, total: 50 },
    },
    {
        id: 3,
        title: "Assignment #4: React Components",
        type: "Assignment",
        points: 75,
        dueDate: "May 20, 2025 at 11:59 PM",
        submitted: 28,
        total: 32,
        status: "Active",
        avgScore: null,
    },
    {
        id: 4,
        title: "Midterm Exam",
        type: "Exam",
        points: 150,
        dueDate: "April 15, 2025 at 11:59 PM",
        submitted: 32,
        total: 32,
        status: "Graded",
        avgScore: { current: 132, total: 150 },
    },
]

const AsssignmentsTab = ({ classId }: AssignmentsTabProps) => {

    const getStatusBadge = (status: string) => {
        const baseClass = styles.statusBadge
        if (status === "Active") {
            return `${baseClass} ${styles.statusActive}`
        } else if (status === "Graded") {
            return `${baseClass} ${styles.statusGraded}`
        }
        return baseClass
    }

    const getTypeIcon = (status: string) => {
        const isGraded = status === "Graded"

        return (
            <div className={`${styles.typeIcon} ${isGraded ? styles.gradedIcon : styles.activeIcon}`}>
                {isGraded ? <CheckCircle className={styles.iconSymbol} /> : <Clock className={styles.iconSymbol} />}
            </div>
        )
    }

    const handleCreateAssignment = () => {
        window.scrollTo(0, 0)
        console.log("Create Assignment clicked")
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>All Assignments</h2>
                <button onClick={handleCreateAssignment} className={styles.createButton}>
                    <Plus className={styles.plusIcon} />
                    Create Assignment
                </button>
            </div>

            <div className={styles.assignmentsList}>
                {mockAssignments.map((assignment) => (
                    <div key={assignment.id} className={styles.assignmentCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.assignmentInfo}>
                                {getTypeIcon(assignment.status)}
                                <div className={styles.assignmentDetails}>
                                    <h3 className={styles.assignmentTitle}>{assignment.title}</h3>
                                    <p className={styles.assignmentMeta}>
                                        {assignment.type} • {assignment.points} points  <br /> Due {assignment.dueDate}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.cardActions}>
                                <span className={getStatusBadge(assignment.status)}>
                                    {assignment.status}
                                </span>
                                <button className={styles.viewButton}>
                                    <ExternalLink className={styles.viewIcon} />
                                    View Details
                                </button>
                            </div>
                        </div>

                        <div className={styles.cardStats}>
                            <div className={styles.submissionStats}>
                                <span className={styles.statLabel}>Submissions:</span>
                                <span className={styles.statValue}>
                                    {assignment.submitted}/{assignment.total} submitted
                                </span>
                            </div>
                            {assignment.avgScore && (
                                <div className={styles.gradeStats}>
                                    <span className={styles.statLabel}>Average Score:</span>
                                    <span className={styles.statValue}>
                                        {assignment.avgScore.current}/{assignment.avgScore.total} avg. score
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AsssignmentsTab
