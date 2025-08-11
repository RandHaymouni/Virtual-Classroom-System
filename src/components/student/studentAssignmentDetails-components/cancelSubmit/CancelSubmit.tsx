import styles from "./cancelSubmit.module.css";
interface CancelSubmitProps {
  hasFiles: boolean;
}


const CancelSubmit = ({ hasFiles }: CancelSubmitProps) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.submitButtonStudent} ${!hasFiles ? styles.disabledButtonStudent : ''}`}
        disabled={!hasFiles}
      >
        Submit Assignment
      </button>
    </div>
  );
}

export default CancelSubmit
