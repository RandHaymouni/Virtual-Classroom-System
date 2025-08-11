import styles from "./commentSection.module.css";

interface CommentSectionProps {
  comments: string;
  setComments: React.Dispatch<React.SetStateAction<string>>;
}

const CommentSection = ({ comments, setComments }: CommentSectionProps) => {
  return (
    <div className={styles.commentSection}>
      <h3 className={styles.title}>Comments (optional)</h3>
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Add any comments about your submission..."
        className={styles.textarea}
      />
    </div>
  );
};

export default CommentSection;
