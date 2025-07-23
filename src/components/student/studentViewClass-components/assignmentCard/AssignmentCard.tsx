import classes from './assignmentCard.module.css'
import { HiExternalLink } from "react-icons/hi";
import { LuClock } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import type { IAssignmentData } from '../types';
import { CiCircleCheck } from "react-icons/ci";
const AssignmentCard = (props: IAssignmentData) => {
    return (
        <div className={classes.assignmentCard}>
            <div className={classes.titleDesc}>
                <h4> {
                    props.status === "Submitted" ? (
                        <FiCheckCircle className={classes.statusSubmitted && classes.position} />
                    ) : (props.status === "Not Submitted" ?
                        <LuClock className={classes.statusNotSub && classes.position} /> :
                        < CiCircleCheck  className={classes.statusGraded && classes.position} />
                    )
                }
                    {props.type} : {props.title}</h4>
                <h6 className={classes.description}>Due : {props.dueDate}  , Points : {props.points}%</h6>

                {
                    props.status === 'Submitted' && (
                        <h5 className={classes.submittedOn}>Submitted on {props.submissionDate} ...  Awaiting degree</h5>
                    )}
                {
                    props.status === 'Graded' && (
                        <h4 className={classes.Graded} >Grade : {props.grade} %</h4>)}
            </div>

            <div className={classes.statusDetails}>
                <h5
                    className={`${classes.status} ${props.status === 'Submitted'
                        ? classes.statusSubmitted
                        : props.status === 'Not Submitted'
                            ? classes.statusNotSub
                            : props.status === 'Graded'
                                ? classes.statusGraded
                                : ''
                        }`}
                >
                    {props.status}
                </h5>
                <button className={classes.detailsBtn} onClick={() => { window.location.href ='studentAssignmentDetails'}}>View Details <HiExternalLink /></button>
            </div>

        </div>
    )
}

export default AssignmentCard