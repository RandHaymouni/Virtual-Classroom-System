import classes from './header.module.css';
import type { IAssignmentHeader } from '../types.ts';
import { RiFileEditLine } from "react-icons/ri";
import { FiChevronRight } from "react-icons/fi";
const Header = (props: IAssignmentHeader) => {
        return (
                <div className={classes.headerContainer}>
                        <div className={classes.assignmentHeader}>
                                <h2 className={classes.title}><RiFileEditLine />  {props.type}  :   {props.title}</h2>
                                <h5 className={classes.details}> <FiChevronRight /> {props.points}  ,  {props.dueDate}</h5>
                                <p className={classes.description}> <FiChevronRight /> {props.description}</p>
                        </div>
                        <div className={classes.actions}>
                                <button className={classes.edit} onClick={() => { window.location.href = `createAssignments` }}>Edit</button>
                        </div>
                </div>
        )
}

export default Header