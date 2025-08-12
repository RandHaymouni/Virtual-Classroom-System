import { useState, useEffect } from "react"
import { ChevronLeft, Plus, Settings } from 'lucide-react'
import AssignmentsTab from "../assignmentsTab/AsssignmentsTab"
import StudentsTab from "../studentsTab/StudentsTab"
import GradebookTab from "../gradeBookTab/GradeBookTab"
import MaterialsTab from "../materialTab/MaterialTab"
import styles from "./classView.module.css"
import { useNavigate } from "react-router-dom"
import EditClassForm from "../../teacherDashboard-components/editClassForm/EditClassForm"

function formatTerm(term: string): string {
  switch (term) {
    case "fall-2025": return "Fall 2025"
    case "spring-2025": return "Spring 2025"
    case "summer-2025": return "Summer 2025"
    case "fall-2024": return "Fall 2024"
    case "spring-2024": return "Spring 2024"
    case "summer-2024": return "Summer 2024"
    case "spring-2023": return "Spring 2023"
    case "summer-2023": return "Summer 2023"
    case "fall-2023": return "Fall 2023"
    case "fall-2022": return "Fall 2022"
    case "spring-2022": return "Spring 2022"
    case "summer-2022": return "Summer 2022"

    default: return term
  }
}

interface IClassViewProps {
  classId: string
}

type TabType = "assignments" | "students" | "materials" | "gradebook"

const tabs = [
  { id: "assignments" as TabType, label: "Assignments" },
  { id: "students" as TabType, label: "Students" },
  { id: "materials" as TabType, label: "Materials" },
  { id: "gradebook" as TabType, label: "Gradebook" },
]

interface ClassInterface {
  _id: string
  title: string
  code: string
  students: []
  description?: string,
  term: string
  activity: {
    text: string
    due: string
    type: string
  }
  color: string
}

const ClassView = ({ classId }: IClassViewProps) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>("assignments")
  const [currentClass, setCurrentClass] = useState<ClassInterface | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClass = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`http://localhost:5000/api/classes/${classId}`, {
          method: "GET",
          credentials: "include",
        })

        if (!response.ok) {
          if (response.status === 404) {
            setError("Class not found.")
          } else if (response.status === 403) {
            setError("Access denied to this class.")
          } else {
            setError("Failed to fetch class data.")
          }
          setCurrentClass(null)
          setLoading(false)
          return
        }

        const data = await response.json()
        setCurrentClass(data.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching class:", err)
        setError("Server error. Please try again later.")
        setCurrentClass(null)
        setLoading(false)
      }
    }

    fetchClass()
  }, [classId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBackToDashboard = () => {
    window.scrollTo(0, 0)
    navigate("/teacherDashboard")
  }

  const handleCreateAssignment = () => {
    window.scrollTo(0, 0)
   navigate(`/createAssignments/${classId}`);
  }

  const handleClassSettings = () => {
    window.scrollTo(0, 0)
    setIsEditDialogOpen(true)
  }

  const handleSaveClassSettings = async (
    id: string,
    updatedData: { title: string; code: string; description?: string; color: string }
  ) => {
    try {
      const response = await fetch(`http://localhost:5000/api/classes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedData)
      })

      if (response.status === 401) {
        alert('You are not authorized. Please log in.')
        navigate('/login')
        return
      }

      if (response.status === 403) {
        alert('You do not have permission to update this class.')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to update class')
      }

      const data = await response.json()
      setCurrentClass(data.data)
      setIsEditDialogOpen(false)

    } catch (error) {
      console.error('Error updating class:', error)
      alert('Failed to update class. Please try again.')
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "assignments":
        return <AssignmentsTab classId={classId} />
      case "students":
        return <StudentsTab classId={classId} />
      case "materials":
        return <MaterialsTab />
      case "gradebook":
        return <GradebookTab classId={classId} />
      default:
        return <AssignmentsTab classId={classId} />
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading class data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={handleBackToDashboard}>Back to Dashboard</button>
      </div>
    )
  }

  if (!currentClass) {
    return null 
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <button onClick={handleBackToDashboard} className={styles.backButton}>
            <ChevronLeft className={styles.backIcon} />
            Back to Dashboard
          </button>
          <div className={styles.headerActions}>
            <button onClick={handleClassSettings} className={styles.settingsButton}>
              <Settings className={styles.settingsIcon} />
              Edit Class
            </button>
            <button onClick={handleCreateAssignment} className={styles.createButton}>
              <Plus className={styles.plusIcon} />
              Create Assignment
            </button>
          </div>
        </div>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{currentClass.title}</h1>
          <p className={styles.metadata}>
            {`${currentClass.code} · ${formatTerm(currentClass.term)} · ${currentClass.students.length} students`}
          </p>
          {currentClass.description && (
            <p className={styles.description}>{currentClass.description}</p>
          )}
          <nav className={styles.tabNavigation}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className={styles.content}>{renderTabContent()}</main>

      {currentClass && (
        <EditClassForm
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          classData={{
            ...currentClass,
            id: currentClass._id,
          }}
          onSave={handleSaveClassSettings}
        />
      )}

    </div>
  )
}

export default ClassView
