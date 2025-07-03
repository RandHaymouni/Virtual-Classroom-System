import classes from './upperHeader.module.css';
import { IoMdArrowRoundBack } from "react-icons/io";
const assignmentStatus = "Submitted"; // This should be passed as a prop or derived from state
const UpperHeader = () => {
    return (
        <div className={classes.upperHeader}>
            <button className={classes.backBtn} onClick={() => window.location.href = '/StudentViewClass'}>
                <IoMdArrowRoundBack /> Back to Assignments
            </button>
            <h5 className={`${classes.status} ${assignmentStatus === "Submitted" ?
                classes.statusSubmitted :
                (assignmentStatus === "Not Submitted" ?
                    classes.statusNotSub :
                    classes.statusGraded
                )}
      `}>
                {assignmentStatus}</h5>
        </div>
    )
}

export default UpperHeader
