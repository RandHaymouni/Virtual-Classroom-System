import StdViewClass from '../../../components/student/studentViewClass-components/viewClass/stdViewClass.tsx'
import AssignmentCard from '../../../components/student/studentViewClass-components/assignmentCard/AssignmentCard'

function StudentViewClass() {
    return (
        <>
            {<StdViewClass className="Math 101"
                classId="MTH101"
                classDetails="Introduction to Mathematics" />}
            {<AssignmentCard type='Quiz' title='Algebra' description='optional assignment' dueDate='June,5th' points={5} status={'Not Submitted'} />}
            {<AssignmentCard type='Assignment' title='Calculus' description='optional assignment' dueDate='June,5th' points={5} status={'Submitted'} submissionDate='June, 4th' />}
            {<AssignmentCard type='Quiz' title='Algebra' description='optional assignment' dueDate='June,5th' points={5} status={'Graded'} grade={90} />}
        </>
    )
}

export default StudentViewClass