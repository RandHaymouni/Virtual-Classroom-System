import { X } from 'lucide-react'
import styles from './submitGrade.module.css'

const SubmitGrade = ({
  studentName,
  assignmentTitle,
  grade,
  feedback,
  setGrade,
  setFeedback,
  onClose,
  onSubmit
}: {
  studentName: string
  assignmentTitle: string
  grade: string
  feedback: string
  setGrade: (val: string) => void
  setFeedback: (val: string) => void
  onClose: () => void
  onSubmit: () => void
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>Grade Student Submission</h2>
            <p className={styles.modalSubtitle}>
              {studentName} • {assignmentTitle}
            </p>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label htmlFor="grade" className={styles.formLabel}>
                Grade (out of 100)
              </label>
              <input
                type="number"
                id="grade"
                min="0"
                max="100"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="feedback" className={styles.formLabel}>
                Feedback
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={styles.formTextarea}
                required
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!grade || !feedback.trim()}
            >
              Submit Grade
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubmitGrade
