import { Plus, Download, Eye, MessageCircle, User } from "lucide-react"
import styles from "./studentsTab.module.css"

interface StudentsTabProps {
    classId: string
}

const mockStudents = [
    {
        id: 1,
        name: "Student Name 1",
        email: "student1@example.com",
        status: "Active",
        joinDate: "Jan 15, 2025",
    },
    {
        id: 2,
        name: "Student Name 2",
        email: "student2@example.com",
        status: "Active",
        joinDate: "Jan 16, 2025",
    },
    {
        id: 3,
        name: "Student Name 3",
        email: "student3@example.com",
        status: "Active",
        joinDate: "Jan 17, 2025",
    },
    {
        id: 4,
        name: "Student Name 4",
        email: "student4@example.com",
        status: "Active",
        joinDate: "Jan 18, 2025",
    },
    {
        id: 5,
        name: "Student Name 5",
        email: "student5@example.com",
        status: "Active",
        joinDate: "Jan 19, 2025",
    },
]

const StudentsTab = ({ classId }: StudentsTabProps) => {

    const handleExportList = () => {
        window.scrollTo(0, 0)
        console.log("Export List clicked")
    }

    const handleInviteStudents = () => {
        window.scrollTo(0, 0)
        console.log("Invite Students clicked")
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Students ({mockStudents.length})</h2>
                <div className={styles.headerActions}>
                    <button onClick={handleExportList} className={styles.exportButton}>
                        <Download className={styles.exportIcon} />
                        Export List
                    </button>
                    <button onClick={handleInviteStudents} className={styles.inviteButton}>
                        <Plus className={styles.plusIcon} />
                        Invite Students
                    </button>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.studentsTable}>
                    <thead>
                        <tr className={styles.tableHeader}>
                            <th className={styles.headerCell}>Name</th>
                            <th className={styles.headerCell}>Email</th>
                            <th className={styles.headerCell}>Status</th>
                            <th className={styles.headerCell}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockStudents.map((student) => (
                            <tr key={student.id} className={styles.tableRow}>
                                <td className={styles.nameCell}>
                                    <div className={styles.studentInfo}>
                                        <div className={styles.avatar}>
                                            <User size={20} />
                                        </div>
                                        <span className={styles.studentName}>{student.name}</span>
                                    </div>
                                </td>
                                <td className={styles.emailCell}>
                                    <a href={`mailto:${student.email}`} className={styles.emailLink}>
                                        {student.email}
                                    </a>
                                </td>
                                <td className={styles.statusCell}>
                                    <span className={styles.statusBadge}>ACTIVE</span>
                                </td>
                                <td className={styles.actionsCell}>
                                    <div className={styles.actionButtons}>
                                        <button className={styles.viewButton}>
                                            <Eye className={styles.actionIcon} />
                                            View
                                        </button>
                                        <button className={styles.messageButton}>
                                            <MessageCircle className={styles.actionIcon} />
                                            Message
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentsTab
