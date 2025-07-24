import classes from './assignmentCard.module.css'
import { HiExternalLink } from "react-icons/hi";
import { LuClock } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import type { IAssignmentData } from '../types';
import { CiCircleCheck } from "react-icons/ci";
import { FiChevronRight } from "react-icons/fi";

const AssignmentCard = (props: IAssignmentData) => {
    return (
        <div className={classes.assignmentCard}>
            <div className={classes.titleDesc}>
                <h3> {
                    props.status === "Submitted" ? (
                        <FiCheckCircle className={classes.statusSubmitted && classes.position} />
                    ) : (props.status === "Not Submitted" ?
                        <LuClock className={classes.statusNotSub && classes.position} /> :
                        < CiCircleCheck className={classes.statusGraded && classes.position} />
                    )
                }
                    {props.type} : {props.title}</h3>
                <h6 className={classes.description}><FiChevronRight />Due : {props.dueDate}  , Points : {props.points}%</h6>

                {
                    props.status === 'Submitted' && (
                        <h6 className={classes.submittedOn}><FiChevronRight />Submitted on {props.submissionDate} ...  Awaiting degree</h6>
                    )}
                {
                    props.status === 'Graded' && (
                        <h5 className={classes.Graded} ><FiChevronRight />Grade : {props.grade} %</h5>)}
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
                <button className={classes.detailsBtn} onClick={() => { window.location.href = 'studentAssignmentDetails' }}>View Details <HiExternalLink /></button>
            </div>

        </div>
    )
}

export default AssignmentCard