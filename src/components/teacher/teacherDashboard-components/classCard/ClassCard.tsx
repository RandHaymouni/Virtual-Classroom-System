import { Users, FileText, Calendar, ClipboardList, Code } from "lucide-react"
import styles from "./classCard.module.css"

interface ClassCardProps {
    title: string
    code: string
    students: number
    activity: {
        text: string
        due: string
        type: string
    }
    color: string
}

const getActivityIcon = (type: string) => {
    switch (type) {
        case "quiz":
            return Calendar
        case "project":
            return FileText
        case "assignment":
            return ClipboardList
        case "exam":
            return Calendar
        default:
            return FileText
    }
}

const ClassCard = ({ title, code, students, activity, color }: ClassCardProps) => {
    const ActivityIcon = getActivityIcon(activity.type)

    return (
        <div className={`${styles.card} ${styles[color]}`}>
            {/* Header section with course info */}
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.code}><Code className={styles.codeIcon} />{code}</div>
            </div>

            {/* Body section */}
            <div className={styles.body}>
                {/* Students count */}
                <div className={styles.studentsInfo}>
                    <Users className={styles.studentsIcon} />
                    <span className={styles.studentsCount}>{students} students</span>
                </div>

                {/* Recent activity */}
                <div className={styles.activitySection}>
                    <h3 className={styles.activityLabel}>Recent activity:</h3>
                    <div className={styles.activityBox}>
                        <div className={styles.activityContent}>
                            <ActivityIcon className={styles.activityIcon} />
                            <div className={styles.activityDetails}>
                                <div className={styles.activityText}>{activity.text}</div>
                                <div className={styles.activityDue}>{activity.due}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* View Class link with divider */}
                <div className={styles.viewSection}>
                    <a href="#" className={styles.viewLink}>
                        View Class
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ClassCard