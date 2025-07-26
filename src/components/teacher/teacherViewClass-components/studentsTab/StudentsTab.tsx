import type React from "react"
import { useState } from "react"
import { Plus, Eye, MessageCircle, User, X, Download } from "lucide-react"
import styles from "./studentsTab.module.css"

interface IStudent {
  id: number
  name: string
  email: string
  status: string
  joinDate: string
}

interface IAssignment {
  id: number
  title: string
  completed: boolean
  dueDate: string
}

const mockAssignments: IAssignment[] = [
  { id: 1, title: "Math Homework Chapter 1", completed: true, dueDate: "Jan 20, 2025" },
  { id: 2, title: "Science Lab Report", completed: false, dueDate: "Jan 25, 2025" },
  { id: 3, title: "English Essay", completed: true, dueDate: "Jan 22, 2025" },
  { id: 4, title: "History Project", completed: false, dueDate: "Jan 30, 2025" },
]

interface StudentsTabProps {
  classId: string
}

const initialMockStudents: IStudent[] = [
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
  const [students, setStudents] = useState<IStudent[]>(initialMockStudents);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const handleInviteStudents = () => {
    window.scrollTo(0, 0);
    setShowInviteForm(true);
  }

  const handleViewStudent = (student: IStudent) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  }

  const handleSubmitInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      const newStudent: IStudent = {
        id: students.length + 1,
        name: formData.name,
        email: formData.email,
        status: "Active",
        joinDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }
      setStudents([...students, newStudent]);
      setFormData({ name: "", email: "" });
      setShowInviteForm(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleExportStudents = () => {
    window.scrollTo(0, 0);
    console.log("Export Grades clicked");
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Students ({students.length})</h2>
        <div className={styles.headerActions}>
          <button onClick={handleExportStudents} className={styles.exportButton}>
            <Download className={styles.exportIcon} />
            Export Students
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
            {students.map((student) => (
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
                    <button onClick={() => handleViewStudent(student)} className={styles.viewButton}>
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

      {/* Invite Student Modal */}
      {showInviteForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Invite New Student</h3>
              <button onClick={() => setShowInviteForm(false)} className={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitInvite} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Student Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter student name"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={() => setShowInviteForm(false)} className={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {showStudentDetails && selectedStudent && (
        <div className={styles.modalOverlay}>
          <div className={styles.detailsModal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Student Details</h3>
              <button onClick={() => setShowStudentDetails(false)} className={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.studentDetails}>
              <div className={styles.studentProfile}>
                <div className={styles.largeAvatar}>
                  <User size={32} />
                </div>
                <div className={styles.studentBasicInfo}>
                  <h4 className={styles.studentDetailName}>{selectedStudent.name}</h4>
                  <p className={styles.studentDetailEmail}>{selectedStudent.email}</p>
                </div>
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Status</span>
                  <span className={styles.statusBadgeSmall}>Active</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Join Date</span>
                  <span className={styles.infoValue}>{selectedStudent.joinDate}</span>
                </div>
              </div>

              <div className={styles.assignmentsSection}>
                <h5 className={styles.sectionTitle}>Assignments</h5>
                <div className={styles.assignmentsList}>
                  {mockAssignments.map((assignment) => (
                    <div key={assignment.id} className={styles.assignmentItem}>
                      <div className={styles.assignmentInfo}>
                        <p className={styles.assignmentTitle}>{assignment.title}</p>
                        <p className={styles.assignmentDue}>Due: {assignment.dueDate}</p>
                      </div>
                      <span
                        className={`${styles.assignmentStatus} ${assignment.completed ? styles.completed : styles.pending}`}
                      >
                        {assignment.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentsTab
