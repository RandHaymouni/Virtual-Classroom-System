import StdViewClass from '../../../components/student/studentViewClass-components/viewClass/stdViewClass.tsx'
import AssignmentCard from '../../../components/student/studentViewClass-components/assignmentCard/AssignmentCard'
import { useState } from 'react';
import MaterialsTab from '../../../components/student/studentViewClass-components/materialsTab/MaterialsTab.tsx';

function StudentViewClass() {
    const [currentSelectedTab, setCurrentSelectedTab] = useState('assignments');

    const handleTabChange = (tabName: string) => {
        setCurrentSelectedTab(tabName); 
    };
    return (
        <>
            {<StdViewClass className="Math 101"
                classId="MTH101"
                classDetails="Introduction to Mathematics"
                onTabChange={handleTabChange} />}
            {currentSelectedTab === 'assignments' && (
                <>
                    <AssignmentCard type='Quiz' title='Algebra' description='optional assignment' dueDate='June,5th' points={5} status={'Not Submitted'} />
                    <AssignmentCard type='Assignment' title='Calculus' description='optional assignment' dueDate='June,5th' points={5} status={'Submitted'} submissionDate='June, 4th' />
                    <AssignmentCard type='Quiz' title='Algebra' description='optional assignment' dueDate='June,5th' points={5} status={'Graded'} grade={90} />
                    <AssignmentCard type='Quiz' title='Algebra' description='optional assignment' dueDate='June,5th' points={5} status={'Graded'} grade={90} />
                    <AssignmentCard type='Quiz' title='Algebra' description='optional assignment' dueDate='June,5th' points={5} status={'Graded'} grade={90} />
                </>
            )}
            {currentSelectedTab === 'materials' && (
                <>
                    <MaterialsTab />
                </>
            )}


        </>
    )
}

export default StudentViewClass