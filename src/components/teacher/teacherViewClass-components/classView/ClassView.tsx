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
    case "fall-2024": return "Fall 2024"
    case "spring-2025": return "Spring 2025"
    case "summer-2024": return "Summer 2024"
    case "fall-2023": return "Fall 2023"
    case "spring-2024": return "Spring 2024"
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
  id: string
  title: string
  code: string
  students: number
  description?: string,
  term: string
  activity: {
    text: string
    due: string
    type: string
  }
  color: string
}

const initialMockClasses: ClassInterface[] = [
  {
    id: "1",
    title: "Web Development 101",
    code: "CSC 2023",
    students: 32,
    term: "spring-2025",
    activity: {
      text: "Final Project Due",
      due: "Tomorrow at 11:59 PM",
      type: "project",
    },
    color: "green",
  },
  {
    id: "2",
    title: "Data Structures",
    code: "CSC 3021",
    students: 28,
    term: "spring-2025",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus possimus consequatur, alias repellat esse culpa fugit, optio repudiandae, architecto quia voluptatum totam quo eum porro soluta consequuntur labore. Consequatur, optio.",
    activity: {
      text: "Quiz #3 Posted",
      due: "Due in 5 days",
      type: "quiz",
    },
    color: "blue",
  },
  {
    id: "3",
    title: "Database Systems",
    code: "CSC 4015",
    students: 24,
    term: "spring-2025",
    activity: {
      text: "Assignment #2",
      due: "Due in 3 days",
      type: "assignment",
    },
    color: "purple",
  },
  {
    id: "4",
    title: "Software Engineering",
    code: "CSC 4101",
    students: 35,
    term: "spring-2025",
    activity: {
      text: "Midterm Exam",
      due: "Next Monday",
      type: "exam",
    },
    color: "orange",
  },
]

const ClassView = ({ classId }: IClassViewProps) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>("assignments")
  const [classes, setClasses] = useState<ClassInterface[]>(initialMockClasses)
  const [currentClass, setCurrentClass] = useState<ClassInterface | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    const foundClass = classes.find((cls) => cls.id === classId)
    if (foundClass) {
      setCurrentClass(foundClass)
    } else {
      navigate("/teacherDashboard")
    }
  }, [classId, navigate, classes])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBackToDashboard = () => {
    window.scrollTo(0, 0)
    navigate("/teacherDashboard")
  }

  const handleCreateAssignment = () => {
    window.scrollTo(0, 0)
    console.log("Create Assignment clicked")
    navigate("/createAssignments")
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
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to update the class.');
        return;
      }
      const response = await fetch(`http://localhost:5000/api/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(updatedData)
      });

      if (response.status === 401) {
        alert('You are not authorized. Please log in.');
        // Optionally redirect to login page
        navigate('/login');
        return;
      }

      if (response.status === 403) {
        alert('You do not have permission to update this class.');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to update class');
      }

      const data = await response.json();

      const updatedClassFromServer = data.data;

      setClasses((prevClasses) =>
        prevClasses.map((cls) => (cls.id === id ? updatedClassFromServer : cls))
      );
      setCurrentClass((prev) => (prev && prev.id === id ? updatedClassFromServer : prev));
      setIsEditDialogOpen(false);

    } catch (error) {
      console.error('Error updating class:', error);
      alert('Failed to update class. Please try again.');
    }
  };

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
            {`${currentClass.code} · ${formatTerm(currentClass.term)} · ${currentClass.students} students`}
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
          classData={currentClass}
          onSave={handleSaveClassSettings}
        />
      )}
    </div>
  )
}

export default ClassView
