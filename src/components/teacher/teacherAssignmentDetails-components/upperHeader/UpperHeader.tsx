import classes from './upperHeader.module.css';
import { IoMdArrowRoundBack } from "react-icons/io";

const UpperHeader = ({ dueDate }: { dueDate: string }) => {
    const calcDays = (dueDate: string): number => {
        const due = new Date(dueDate);
        const today = new Date();
        const timeDiff = due.getTime() - today.getTime();
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    };

    const isActive: string = calcDays(dueDate) >= 0 ? 'Active' : 'Overdue';
    return (
        <div className={classes.upperHeader}>
            <button className={classes.backBtn} onClick={() => window.location.href = '/class/2'}>
                <IoMdArrowRoundBack /> <h5 >Back To All Assignments</h5>
            </button>
            <h5 className={`${classes.status} ${isActive === "Active" ?
                classes.active : classes.notActive}`}>
                {isActive}</h5>
        </div>
    )
}

export default UpperHeader