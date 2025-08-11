import { Users, FileText, Calendar, ClipboardList, MoreVertical } from 'lucide-react'
import styles from "./classCard.module.css"
import { useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"

interface ClassCardProps {
  id: string
  title: string
  code: string
  students: number
  activity: {
    text: string
    due: string
    type: string
  }
  color: string
  onDelete: (id: string) => void
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

const ClassCard = ({ id, title, code, students, activity, color, onDelete }: ClassCardProps) => {
  const navigate = useNavigate()
  const ActivityIcon = getActivityIcon(activity.type)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleViewClass = () => {
    window.scrollTo(0, 0)
    navigate(`/class/${id}`)
  }

  const handleDeleteClass = () => {
    onDelete(id)
  }

  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.code}>{code}</p>
        <div className={styles.dropdownContainer} ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={styles.dropdownTrigger}
            aria-label="Open menu"
          >
            <MoreVertical className={styles.dropdownIcon} />
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownContent}>
              <div className={styles.dropdownItems}>
                <button
                  onClick={handleDeleteClass}
                  className={styles.dropdownItem}
                >
                  Delete Class
                </button>
              </div>
            </div>
          )}
        </div>
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
