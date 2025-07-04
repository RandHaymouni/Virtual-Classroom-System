import classes from './cancelSubmit.module.css';

const CancelSubmit = ({isUploaded}:{isUploaded:boolean}) => {
    return (
        <div className={classes.actions}>
            <button className={classes.cancelBtn}>Cancel</button>
            {isUploaded && <button className={classes.submitBtn}>Submit Assignment</button>}
        </div>
    )
}

export default CancelSubmit
