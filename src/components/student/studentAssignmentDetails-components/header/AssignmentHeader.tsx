import classes from './assignmentHeader.module.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import type { IAssignmentHeader } from '../types.ts';

const AssignmentHeader = (props: IAssignmentHeader) => {
  return (
    <>
      <div className={classes.upperHeader}>
        <button className={classes.backBtn} onClick={props.onBackClick}> <IoMdArrowRoundBack /> Back to Assignments</button>
        <h5 className={`${classes.status} ${props.assignmentStatus === "Submitted" ? 
            classes.statusSubmitted  :
          (props.assignmentStatus === "Not Submitted" ?
             classes.statusNotSub :
             classes.statusGraded  
          )}
          `}>
          {props.assignmentStatus}</h5>
      </div>
      <div className={classes.assignmentHeader}>
        <h2 className={classes.title}>{props.title}: {props.title}</h2>
        <h6 className={classes.details}>{props.points}.{props.dueDate}</h6>
        <p className={classes.description}>{props.description}</p>

      </div>
    </>
  )
}

export default AssignmentHeader
