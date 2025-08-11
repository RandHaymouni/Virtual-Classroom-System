import styles from "./cancelSubmit.module.css"
interface CancelSubmitProps {
  hasFiles: boolean
}

export default function CancelSubmit({ hasFiles }: CancelSubmitProps) {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.cancelButton}>Cancel</button>
      <button className={`${styles.submitButton} ${!hasFiles ? styles.disabled : ""}`} disabled={!hasFiles}>
        Submit Assignment
      </button>
    </div>
  )
}
