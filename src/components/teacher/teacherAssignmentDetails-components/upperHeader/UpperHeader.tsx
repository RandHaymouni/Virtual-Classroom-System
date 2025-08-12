import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import styles from "./upperHeader.module.css"

const UpperHeader = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {

  }

  return (
    <div className={styles.upperHeaderContainer}>
      <button className={styles.backButton} onClick={handleBackClick}>
        <ArrowLeft size={16} />
        <span>Back to Assignments</span>
      </button>
    </div>
  )
}

export default UpperHeader
