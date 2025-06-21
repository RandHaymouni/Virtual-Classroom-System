import ClassCard from "../../../components/teacher/teacherDashboard-components/classCard/ClassCard"
import CreateClassCard from "../../../components/teacher/teacherDashboard-components/createNewClass/CreateNewClass"
import { GraduationCap, BookOpen } from "lucide-react"
import styles from "./teacherDashboard.module.css"

const mockClasses = [
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

const TeacherDashboard = () => {
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
        {mockClasses.map((classData) => (
          <ClassCard
            key={classData.id}
            id={classData.id}
            title={classData.title}
            code={classData.code}
            students={classData.students}
            activity={classData.activity}
            color={classData.color}
          />
        ))}
        <CreateClassCard />
      </div>
    </div>
  )
}

export default TeacherDashboard
