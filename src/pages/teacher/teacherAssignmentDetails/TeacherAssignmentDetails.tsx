import React from 'react'
import UpperHeader from '../../../components/teacher/teacherAssignmentDetails-components/upperHeader/UpperHeader'
import Header from '../../../components/teacher/teacherAssignmentDetails-components/header/header'
import classes from './teacherAssignmentsDetails.module.css'
const TeacherAssignmentDetails = () => {
  return (
          <>
              <UpperHeader />
                    <span className={classes.container}>
              <Header title='Assignment' description='Lorem ipsum dolor sit, amet consectetur adipisicing elit.' points='100' dueDate='June,5' />
              
                  </span>
          </>
  )
}

export default TeacherAssignmentDetails
