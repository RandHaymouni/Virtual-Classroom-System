import { useState, useEffect } from "react"
import ClassCard from "../../../components/teacher/teacherDashboard-components/classCard/ClassCard"
import CreateClassCard from "../../../components/teacher/teacherDashboard-components/createNewClass/CreateNewClass"
import { GraduationCap, BookOpen } from 'lucide-react'
import styles from "./teacherDashboard.module.css"

const TeacherDashboard = () => {
  const [classes, setClasses] = useState<any[]>([])

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/classes", {
          method: "GET",
          credentials: "include",
        })

        if (!response.ok) {
          const errorData = await response.json()
          alert(`Failed to fetch classes: ${errorData.message || response.statusText}`)
          return
        }

        const data = await response.json()
        console.log("Data:", data);

        setClasses(data.data || [])
      } catch (error) {
        console.error("Error fetching classes:", error)
        alert("An unexpected error occurred while fetching the classes.")
      }
    }

    fetchClasses()
  }, [])

  const handleDeleteClass = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/classes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // مهم عشان الكوكي يروح
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(`Failed to delete class: ${errorData.message || response.statusText}`)
        return
      }

      setClasses(prevClasses => prevClasses.filter(cls => cls._id !== id))
    } catch (error) {
      console.error('Error deleting class:', error)
      alert('An unexpected error occurred while deleting the class.')
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <GraduationCap className={styles.mainIcon} />
        </div>
        <h1 className={styles.title}>Teacher Dashboard</h1>
        <p className={styles.subtitle}>
          <BookOpen className={styles.subtitleIcon} />
          Manage your courses and track student progress
        </p>
      </header>
      <div className={styles.dashboard}>
        {classes.map((classData) => (
          <ClassCard
            key={classData._id}
            id={classData._id}
            title={classData.title}
            code={classData.code}
            students={classData.students?.length || 0}
            activity={classData.activity || { type: "default", text: "No recent activity", due: "" }}
            color={classData.color}
            onDelete={handleDeleteClass}
          />
        ))}
        <CreateClassCard />
      </div>
    </div>
  )
}

export default TeacherDashboard
