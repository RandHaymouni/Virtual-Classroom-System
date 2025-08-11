import classes from './cancelSubmit.module.css';
interface ICancel {
    isUploaded: boolean;
    handleCancel: () => void;
    handleSubmit: () => void;
}
const CancelSubmit = (props: ICancel) => {
    return (
        <div className={classes.actions}>
            <button className={classes.cancelBtn} onClick={props.handleCancel}>Cancel</button>
            {props.isUploaded && <button className={classes.submitBtn} onClick={props.handleSubmit}>Submit Assignment</button>}
        </div>
    )
}

export default CancelSubmit
