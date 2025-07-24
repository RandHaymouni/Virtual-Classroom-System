import classes from './assignmentHeader.module.css';
import type { IAssignmentHeader } from '../types.ts';
import { RiFileEditLine } from "react-icons/ri";
import { FiChevronRight } from "react-icons/fi";
const AssignmentHeader = (props: IAssignmentHeader) => {
  return (
    <>
      <div className={classes.assignmentHeader}>
        <h2 className={classes.title}><RiFileEditLine /> {props.title}: {props.title}</h2>
        <h6 className={classes.details}><FiChevronRight />{props.points}.{props.dueDate}</h6>
        <p className={classes.description}><FiChevronRight />{props.description}</p>
      </div>

    </>
  )
}

export default AssignmentHeader
