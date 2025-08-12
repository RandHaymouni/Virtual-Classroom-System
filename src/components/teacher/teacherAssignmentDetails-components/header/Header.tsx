import styles from "./header.module.css"

interface AssignmentData {
  type: string
  title: string
  points: string
  dueDate: string
  description: string
}

interface HeaderProps {
  assignmentData: AssignmentData
}

const Header = ({ assignmentData }: HeaderProps) => {
  return (
    <>
      {/* Assignment Header */}
      <div className={styles.headerContainer}>
        <div className={styles.assignmentHeader}>
          <h1 className={styles.title}>
            {assignmentData.type}: {assignmentData.title}
          </h1>
          <p className={styles.details}>
            {assignmentData.type} • {assignmentData.points} • {assignmentData.dueDate}
          </p>
          <p className={styles.description}>{assignmentData.description}</p>
        </div>
      </div>
       <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headerIcon}></div>
          <h3 className={styles.headerTitle}>Attachments</h3>
        </div>
        <div className={styles.filesList}>
          <div className={styles.fileItem}>
            <div className={styles.fileInfo}>
              <div className={styles.fileIconWrapperGreen}>
                <div className={styles.fileIconGreen}></div>
              </div>
              <div>
                <p className={styles.fileName}>project_rubric.pdf</p>
                <p className={styles.fileSize}>(245 KB)</p>
              </div>
            </div>
            <button className={styles.downloadButton}>Download</button>
          </div>
          <div className={styles.fileItem}>
            <div className={styles.fileInfo}>
              <div className={styles.fileIconWrapperBlue}>
                <div className={styles.fileIconBlue}></div>
              </div>
              <div>
                <p className={styles.fileName}>example_project.zip</p>
                <p className={styles.fileSize}>(1.2 MB)</p>
              </div>
            </div>
            <button className={styles.downloadButton}>Download</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Header;