import classes from './commentSection.module.css';

const CommentSection = () => {
    return (
        <div className={classes.commentSection}>
            <h5 className={classes.title}>Comments (optional) </h5>
            <input type="text" name="comment" id="comment" className={classes.commentInput} placeholder='Add any comments about your submission...' />
        </div>
    )
}

export default CommentSection
