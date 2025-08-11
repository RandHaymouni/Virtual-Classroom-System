import styles from "./assignmentHeader.module.css"

const AssignmentHeader = () => {
  return (
    <div className={styles.assignmentHeader}>
      <h1 className={styles.title}>
        <div className={styles.icon}>
          <div className={styles.iconInner}></div>
        </div>
        Final Project: Building a Web Application
      </h1>
      <div className={styles.metadata}>Project • 100 points • Due May 25, 2025 at 11:59 PM</div>
      <p className={styles.description}>
        Create a full-stack web application using the technologies we've learned throughout the semester. Your
        application should demonstrate your understanding of front-end development, back-end integration, and database
        management.
      </p>
    </div>
  )
}

export default AssignmentHeader;