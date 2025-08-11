import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import styles from "./upperHeader.module.css"

export default function UpperHeader() {
  const navigate = useNavigate()

  return (
    <div className={styles.upperHeader}>
      <div className={styles.headerContent}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/StudentViewClass")}
        >
          <ArrowLeft size={16} />
          Back to Assignments
        </button>
        <span className={styles.statusBadge}>Not Submitted</span>
      </div>
    </div>
  )
}
