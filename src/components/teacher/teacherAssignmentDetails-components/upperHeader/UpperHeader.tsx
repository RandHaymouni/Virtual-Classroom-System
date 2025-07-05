import classes from './upperHeader.module.css';
import { IoMdArrowRoundBack } from "react-icons/io";
const assignmentStatus = "Submitted"; 

const UpperHeader = () => {
    return (
        <div className={classes.upperHeader}>
            <button className={classes.backBtn} onClick={() => window.location.href = '/TeacherViewClass'}>
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