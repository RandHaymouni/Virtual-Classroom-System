import classes from './upperHeader.module.css';
import { ArrowLeft } from "lucide-react";
const assignmentStatus = "Submitted"; // This should be passed as a prop or derived from state
const UpperHeader = () => {
    return (
        <div className={classes.upperHeader}>
            <button className={classes.backBtn} onClick={() => window.location.href = '/StudentViewClass'}>
                <ArrowLeft className="yourCustomClass" /> Back to Assignments
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
