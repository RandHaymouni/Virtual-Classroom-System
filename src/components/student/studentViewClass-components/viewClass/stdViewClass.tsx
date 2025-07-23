import { useState } from 'react';
import classes from './stdViewClass.module.css'
import type { IClassData } from '../types';

const StdViewClass = (props: IClassData) => {
    const [selectedTab, setSelectedTab] = useState('assignments');
    return (
        <>
            <div className={classes.classHeader}>
                <button className={classes.backBtn}>
                    <span style={{ fontSize: '20px' }}>&#8592;</span> Back to Dashboard</button>
                <div className={classes.classInfo}>

                    <h1 >{props.className}
                        <span className={classes.id}>{props.classId}</span> </h1>


                    <p className={classes.classData}>{props.classDetails}</p>
                </div>
            </div>

            <div className={classes.classContent}>


                <div className={classes.tabs}>
                    <button
                        className={`${classes.assignmentsBtn} ${selectedTab === 'assignments' ? classes.selectedTab : ''}`}
                        onClick={() => setSelectedTab('assignments')}
                    >
                        Assignments
                    </button>

                    <button
                        className={`${classes.materialsBtn} ${selectedTab === 'materials' ? classes.selectedTab : ''}`}
                        onClick={() => setSelectedTab('materials')}
                    >
                        Materials
                    </button>

                    <button
                        className={`${classes.myGradesBtn} ${selectedTab === 'myGrades' ? classes.selectedTab : ''}`}
                        onClick={() => setSelectedTab('myGrades')}
                    >
                        My Grades
                    </button>

                </div>

                <h2 style={{ margin: '40px 20px' }}>All Assignments</h2>




            </div>
        </>
    )
}

export default StdViewClass