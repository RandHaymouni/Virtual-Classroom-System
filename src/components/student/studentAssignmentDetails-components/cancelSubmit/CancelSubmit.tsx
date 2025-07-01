import classes from './cancelSubmit.module.css';

const CancelSubmit = () => {
    return (
        <div className={classes.actions}>
            <button className={classes.cancelBtn}>Cancel</button>
            <button className={classes.submitBtn}>Submit Assignment</button>
        </div>
    )
}

export default CancelSubmit
