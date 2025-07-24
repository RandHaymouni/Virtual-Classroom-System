import { useState } from "react"
import { ArrowLeft, Paperclip, FileText, Download } from "lucide-react"
import styles from "./viewAssignmentsDetails.module.css"
import SubmitGrade from "../submitGrade/SubmitGrade"

const ViewAssignmentsDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [grade, setGrade] = useState("")
    const [feedback, setFeedback] = useState("")

    const submissionData = {
        student: {
            name: "Emma Johnson",
            id: "S10045678",
        },
        assignment: {
            title: "Final Project: Building a Web Application",
            dueDate: "May 25, 2025 at 11:59 PM",
        },
        submission: {
            date: "May 24, 2025 at 10:23 AM",
            files: [
                { name: "final_project.zip", size: "4.2 MB", type: "zip" },
                { name: "readme.pdf", size: "320 KB", type: "pdf" },
            ],
            comments: "I've included a README file with instructions on how to run the project.",
        },
    }

    const handleDownload = (fileName: string) => {
        console.log(`Downloading ${fileName}`)
    }

    const handleSubmit = () => {
        if (!grade || !feedback.trim()) {
            alert("Please provide both a grade and feedback.")
            return
        }
        console.log("Submitting grade:", { grade, feedback })
        alert("Grade submitted successfully!")
        setIsModalOpen(false)
        setGrade("")
        setFeedback("")
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.breadcrumbs}>
                    <a href="/teacherViewClass" className={styles.breadcrumb}>
                        <ArrowLeft />
                        Back to Assignments
                        <span className={`${styles.statusBadge} ${styles.active}`}>Active</span>
                    </a>
                    <a href="/teacherAssignmentDetails" className={styles.breadcrumb}>
                        <ArrowLeft />
                        Back to Submissions
                        <span className={`${styles.statusBadge} ${styles.submitted}`}>Submitted</span>
                    </a>
                </div>

                <div className={styles.submissionCard}>
                    <div className={styles.submissionHeader}>
                        <h1 className={styles.submissionTitle}>Student Submission</h1>
                        <p className={styles.submissionMeta}>
                            {submissionData.assignment.title} • {submissionData.student.name} ({submissionData.student.id})
                        </p>
                    </div>

                    <div className={styles.submissionDetails}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Submission Date</span>
                            <p className={styles.detailValue}>{submissionData.submission.date}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Assignment Due</span>
                            <p className={styles.detailValue}>{submissionData.assignment.dueDate}</p>
                        </div>
                    </div>

                    <div className={styles.filesSection}>
                        <h2 className={styles.sectionTitle}>
                            <Paperclip />
                            Submitted Files
                        </h2>
                        <div className={styles.filesList}>
                            {submissionData.submission.files.map((file, index) => (
                                <div key={index} className={styles.fileItem}>
                                    <div className={styles.fileInfo}>
                                        <div className={styles.fileIcon}>
                                            <FileText />
                                        </div>
                                        <div className={styles.fileDetails}>
                                            <p className={styles.fileName}>{file.name}</p>
                                            <p className={styles.fileSize}>({file.size})</p>
                                        </div>
                                    </div>
                                    <button className={styles.downloadButton} onClick={() => handleDownload(file.name)}>
                                        <Download /> Download
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.commentsSection}>
                        <h2 className={styles.sectionTitle}>Student Comments</h2>
                        <p className={styles.commentsText}>{submissionData.submission.comments}</p>
                    </div>

                    <div className={styles.actionButtons}>
                        <button className={styles.gradeButton} onClick={() => setIsModalOpen(true)}>
                            Grade Submission
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <SubmitGrade
                    studentName={submissionData.student.name}
                    assignmentTitle={submissionData.assignment.title}
                    grade={grade}
                    feedback={feedback}
                    setGrade={setGrade}
                    setFeedback={setFeedback}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    )
}

export default ViewAssignmentsDetails
