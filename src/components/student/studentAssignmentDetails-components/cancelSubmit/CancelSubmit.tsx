import styles from "./cancelSubmit.module.css";

interface CancelSubmitProps {
  hasFiles: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const CancelSubmit = ({ hasFiles, onSubmit, isSubmitting }: CancelSubmitProps) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.submitButtonStudent} ${!hasFiles ? styles.disabledButtonStudent : ''}`}
        disabled={!hasFiles || isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? "Submitting..." : "Submit Assignment"}
      </button>
    </div>
  );
};

export default CancelSubmit;
