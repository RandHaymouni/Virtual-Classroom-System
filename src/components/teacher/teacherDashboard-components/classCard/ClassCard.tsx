import { Users, FileText, Calendar, ClipboardList } from "lucide-react"
import styles from "./classCard.module.css"
import { useNavigate } from "react-router"

interface ClassCardProps {
  id?: number
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
      return FileText
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

const ClassCard = ({ id = 1, title, code, students, activity, color }: ClassCardProps) => {
  const navigate = useNavigate();
  const ActivityIcon = getActivityIcon(activity.type)

  const handleViewClass = () => {
    window.scrollTo(0, 0)
    navigate(`/class/${id}`)
  }

  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.code}>{code}</p>
      </div>

      <div className={styles.body}>
        <div className={styles.studentsInfo}>
          <Users className={styles.studentsIcon} />
          <span className={styles.studentsCount}>{students} students</span>
        </div>

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

        <div className={styles.viewSection}>
          <button onClick={handleViewClass} className={styles.viewLink}>
            View Class
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClassCard
