import { Plus, ArrowRight } from "lucide-react"
import styles from "./createNewClass.module.css"
import { useNavigate } from "react-router"

const CreateNewClass = () => {
  const navigate = useNavigate();
  const handleCreateClass = () => {
    navigate("/createClass")
  }

  return (
    <div className={styles.card} onClick={handleCreateClass}>
      <div className={styles.iconContainer}>
        <Plus className={styles.plusIcon} />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>Create New Class</h2>
        <p className={styles.description}>Set up a new course and start managing your students</p>
      </div>

      <button className={styles.createButton} onClick={handleCreateClass}>
        <span>Create Class</span>
        <ArrowRight className={styles.arrowIcon} />
      </button>
    </div>
  )
}

export default CreateNewClass