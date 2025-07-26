import { useState, useEffect } from "react"
import { ChevronLeft, Plus, Settings } from "lucide-react"
import AssignmentsTab from "../assignmentsTab/AsssignmentsTab"
import StudentsTab from "../studentsTab/StudentsTab"
import GradebookTab from "../gradeBookTab/GradeBookTab"
import MaterialsTab from "../materialTab/MaterialTab"
import styles from "./classView.module.css"
import { useNavigate } from "react-router"

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

interface CalssInterface {
  id: number
  title: string
  code: string
  students: number
  activity: {
    text: string
    due: string
    type: string
  }
  color: string
}

const mockClasses: CalssInterface[] = [
  {
    id: 1,
    title: "Web Development 101",
    code: "CSC 2023",
    students: 32,
    activity: {
      text: "Final Project Due",
      due: "Tomorrow at 11:59 PM",
      type: "project",
    },
    color: "green",
  },
  {
    id: 2,
    title: "Data Structures",
    code: "CSC 3021",
    students: 28,
    activity: {
      text: "Quiz #3 Posted",
      due: "Due in 5 days",
      type: "quiz",
    },
    color: "blue",
  },
  {
    id: 3,
    title: "Database Systems",
    code: "CSC 4015",
    students: 24,
    activity: {
      text: "Assignment #2",
      due: "Due in 3 days",
      type: "assignment",
    },
    color: "purple",
  },
  {
    id: 4,
    title: "Software Engineering",
    code: "CSC 4101",
    students: 35,
    activity: {
      text: "Midterm Exam",
      due: "Next Monday",
      type: "exam",
    },
    color: "orange",
  },
]

const ClassView = ({ classId }: IClassViewProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("assignments");
  const [currentClass, setCurrentClass] = useState<any>(null);

  useEffect(() => {
    const foundClass = mockClasses.find((cls) => cls.id === Number.parseInt(classId))
    if (foundClass) {
      setCurrentClass(foundClass)
    } else {
      navigate("/teacherDashboard")
    }
  }, [classId, navigate])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleBackToDashboard = () => {
    window.scrollTo(0, 0);
    navigate("/teacherDashboard");
  }

  const handleCreateAssignment = () => {
    window.scrollTo(0, 0);
    console.log("Create Assignment clicked");
    navigate("/createAssignments");
  }

  const handleClassSettings = () => {
    window.scrollTo(0, 0);
    // Navigation can be added to the class settings page here
    console.log("Class Settings clicked");
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

  if (!currentClass) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>
          <p>Loading class data...</p>
        </div>
      </div>
    )
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
              Class Settings
            </button>
            <button onClick={handleCreateAssignment} className={styles.createButton}>
              <Plus className={styles.plusIcon} />
              Create Assignment
            </button>
          </div>
        </div>

        <div className={styles.headerContent}>
          <h1 className={styles.title}>{currentClass ? currentClass.title : "Loading..."}</h1>
          <p className={styles.metadata}>
            {currentClass ? `${currentClass.code} · Spring 2025 · ${currentClass.students} students` : "Loading..."}
          </p>
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
    </div>
  )
}

export default ClassView
