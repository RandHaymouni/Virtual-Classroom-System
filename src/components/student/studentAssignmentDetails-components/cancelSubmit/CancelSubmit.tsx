import classes from './cancelSubmit.module.css';
interface ICancel {
    isUploaded: boolean;
    handleCancel: () => void;
}
const CancelSubmit = (props: ICancel) => {
    return (
        <div className={classes.actions}>
            <button className={classes.cancelBtn} onClick={props.handleCancel}>Cancel</button>
            {props.isUploaded && <button className={classes.submitBtn} >Submit Assignment</button>}
        </div>
    )
}

export default CancelSubmit
