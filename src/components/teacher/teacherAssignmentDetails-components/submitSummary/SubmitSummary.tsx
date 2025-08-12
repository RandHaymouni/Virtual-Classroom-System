import styles from "./submitSummary.module.css"

interface SubmitSummaryProps {
    submittedCount: number
    totalStudents: number
    gradedCount: number
    daysRemaining: number
}

const SubmitSummary = ({
    submittedCount,
    totalStudents,
    gradedCount,
    daysRemaining,
}: SubmitSummaryProps) => {
    return (
        <div className={styles.myGrid}>
            <div className={styles.submitSummaryContainer}>
                <h3 className={styles.summaryTitle}>Submissions</h3>
                <div className={styles.summaryNumber}>
                    {submittedCount}/{totalStudents}
                </div>
                <p className={styles.summaryDetails}>
                    {Math.round((submittedCount / totalStudents) * 100)}% Complete
                </p>
            </div>

            <div className={styles.submitSummaryContainer}>
                <h3 className={styles.summaryTitle}>Graded</h3>
                <div className={styles.summaryNumber}>
                    {gradedCount}/{submittedCount}
                </div>
                <p className={styles.summaryDetails}>
                    {submittedCount > 0
                        ? Math.round((gradedCount / submittedCount) * 100)
                        : 0}% Complete
                </p>
            </div>

            <div className={styles.submitSummaryContainer}>
                <h3 className={styles.dueDateDesc}>Time Remaining</h3>
                <div className={styles.dueDate}>{daysRemaining} days</div>
                <p className={styles.dueDateDesc}>Until due date</p>
            </div>
        </div>
    )
}

export default SubmitSummary