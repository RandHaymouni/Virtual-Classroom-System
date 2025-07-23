import { useState } from 'react';
import classes from './assignmentCard.module.css'
import { HiExternalLink } from "react-icons/hi";
import { LuClock } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import type { IAssignmentData } from '../types';


const AssignmentCard = (props: IAssignmentData) => {
    const [assignmentStatus, setAssignmentStatus] = useState('Not Submitted');
    { props.status === 'Submitted' && setAssignmentStatus('Submitted') }
    { props.status === 'Graded' && setAssignmentStatus('Graded') }
    return (
        <div className={classes.assignmentCard}>
            <div className={classes.titleDesc}>
                <h4> {
                    assignmentStatus === "Submitted" ? (
                        <FiCheckCircle className={classes.statusSubmitted && classes.position} />
                    ) : (assignmentStatus === "Not Submitted" ?
                        <LuClock className={classes.statusNotSub && classes.position} /> :
                        <FiCheckCircle className={classes.statusGraded && classes.position} />
                    )
                }
                    {props.type} : {props.title}</h4>
                <h6 className={classes.description}>Due : {props.dueDate}    , Points : {props.points}%</h6>

                {
                    assignmentStatus === 'Submitted' && (
                        <h6 className={classes.statusSubmitted}>Submitted on {props.submissionDate}. Awaiting degree</h6>
                    )}
                {
                    assignmentStatus === 'Graded' && (
                        <h6 className={classes.statusGraded} >Grade: {props.grade} %</h6>)}
            </div>

            <div className={classes.statusDetails}>
                <h5
                    className={`${classes.status} ${assignmentStatus === 'Submitted'
                        ? classes.statusSubmitted
                        : assignmentStatus === 'Not Submitted'
                            ? classes.statusNotSub
                            : assignmentStatus === 'Graded'
                                ? classes.statusGraded
                                : ''
                        }`}
                >
                    {assignmentStatus}
                </h5>
                <button className={classes.detailsBtn} >View Details <HiExternalLink /></button>
            </div>

        </div>
    )
}

export default AssignmentCard