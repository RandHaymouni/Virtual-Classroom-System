import { useParams } from "react-router-dom"
import TeacherclassView from "../../../components/teacher/teacherViewClass-components/classView/ClassView"

const TeacherViewClass = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) return <div>Invalid class ID</div>

  return (
    <main>
      <TeacherclassView classId={id} />
    </main>
  )
}

export default TeacherViewClass
