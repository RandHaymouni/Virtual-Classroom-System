import { useState } from "react"
import { Search, Filter } from "lucide-react"
import styles from "./stdSubmissions.module.css"
import SubmitGrade from "../../createAssignments-components/viewAssignments/submitGrade/SubmitGrade"
import { useNavigate } from "react-router"
interface Student {
  id: number
  name: string
  submissionDate: string | null
  status: string
}

interface StdSubmissionsTableProps {
  studentData: Student[]
}

const StdSubmissionsTable = ({ studentData }: StdSubmissionsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [grade, setGrade] = useState("")
  const [feedback, setFeedback] = useState("")
  const navigate = useNavigate()

  const filteredStudents = studentData.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus ? student.status === filterStatus : true
    return matchesSearch && matchesFilter
  })

  const toggleFilter = () => {
    if (!filterStatus) setFilterStatus("Submitted")
    else if (filterStatus === "Submitted") setFilterStatus("Not Submitted")
    else setFilterStatus(null)
  }

  const handleView = () => {
    navigate(`/viewAssignmentsDetails`)
  }

  const handleGrade = (student: Student) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    if (!grade || !feedback.trim()) {
      alert("Please provide both a grade and feedback.")
      return
    }
    console.log("Submitting grade:", { student: selectedStudent?.name, grade, feedback })
    alert("Grade submitted successfully!")
    setIsModalOpen(false)
    setGrade("")
    setFeedback("")
    setSelectedStudent(null)
  }

  return (
    <div className={styles.submissionsContainer}>
      <div className={styles.submissionsHeader}>
        <h3 className={styles.title}>Student Submissions</h3>
        <div className={styles.controls}>
          <div style={{ position: "relative" }}>
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className={styles.searchInput}
              style={{ paddingLeft: "2.5rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.filterButton} onClick={toggleFilter}>
            <Filter size={16} />
            {filterStatus ? filterStatus : "All"}
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.tableHeaderCell}>Student</th>
            <th className={styles.tableHeaderCell}>Submission Date</th>
            <th className={styles.tableHeaderCell}>Status</th>
            <th className={styles.tableHeaderCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id} className={styles.tableRow}>
              <td className={`${styles.tableCell} ${styles.studentName}`}>{student.name}</td>
              <td className={`${styles.tableCell} ${styles.submissionDate}`}>{student.submissionDate || "—"}</td>
              <td className={styles.tableCell}>
                <span
                  className={`${styles.statusBadge} ${student.status === "Submitted" ? styles.statusSubmitted : styles.statusNotSubmitted
                    }`}
                >
                  {student.status}
                </span>
              </td>
              <td className={styles.tableCell}>
                <div className={styles.actionButtons}>
                  {student.status !== "Not Submitted" && (
                    <button
                      className={`${styles.actionButton} ${styles.viewButton}`}
                      onClick={handleView}
                    >
                      View
                    </button>
                  )}
                  {student.status === "Submitted" && (
                    <button
                      className={`${styles.actionButton} ${styles.gradeButton}`}
                      onClick={() => handleGrade(student)}  // هنا لازم تمرر الطالب
                    >
                      Grade
                    </button>
                  )}
                  {student.status === "Not Submitted" && (
                    <button
                      className={`${styles.actionButton} ${styles.viewButton}`}
                      onClick={handleView}
                    >
                      View
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {filteredStudents.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.tableCell} style={{ textAlign: "center", color: "gray" }}>
                No matching students
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && selectedStudent && (
        <SubmitGrade
          studentName={selectedStudent.name}
          assignmentTitle="Assignment Title"  // ممكن تمرر عنوان الواجب لو عندك
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

export default StdSubmissionsTable