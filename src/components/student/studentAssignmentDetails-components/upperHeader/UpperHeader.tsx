import classes from './upperHeader.module.css';
import { ArrowLeft } from "lucide-react";
const UpperHeader = ({ assignmentStatus }: { assignmentStatus: string }) => {
    return (
        <div className={classes.upperHeader}>
            <button className={classes.backBtn} onClick={() => window.location.href = '/StudentViewClass'}>
                <ArrowLeft /> Back to Assignments
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
