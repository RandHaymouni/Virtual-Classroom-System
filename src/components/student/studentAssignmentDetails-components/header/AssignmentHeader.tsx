import classes from './assignmentHeader.module.css';
import type { IAssignmentHeader } from '../types.ts';

const AssignmentHeader = (props: IAssignmentHeader) => {
  return (
    <>

      <div className={classes.assignmentHeader}>
        <h2 className={classes.title}>{props.title}: {props.title}</h2>
        <h6 className={classes.details}>{props.points}.{props.dueDate}</h6>
        <p className={classes.description}>{props.description}</p>

      </div>

    </>
  )
}

export default AssignmentHeader
