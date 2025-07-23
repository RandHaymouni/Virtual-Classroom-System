import classes from './header.module.css';
import type { IAssignmentHeader } from '../types.ts';

const Header = (props: IAssignmentHeader) => {
    return (
            <div className={classes.headerContainer}>
                    <div className={classes.assignmentHeader}>
                        <h2 className={classes.title}>{props.title}: {props.title}</h2>
                        <h6 className={classes.details}>{props.points}.{props.dueDate}</h6>
                        <p className={classes.description}>{props.description}</p>
                    </div>
                    
                    <div className={classes.actions}>
                            <button className={classes.edit}>Edit</button>
                    </div>
            </div>
    )
}

export default Header