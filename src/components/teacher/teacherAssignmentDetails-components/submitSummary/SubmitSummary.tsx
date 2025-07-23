import classes from './submitSummary.module.css'
import type {ISummary } from '../types';
import useSubmitSummary from './useSubmitSummary.hook';
const { calcDays, percentage } = useSubmitSummary();
const SubmitSummary = (props: ISummary) => {
  return (
    <div className={classes.submitSummaryContainer}>
      <h5 className={classes.summaryTitle}>{props.title}</h5>
      {props.total &&
        <h1 className={classes.summaryNumber}>{props.count}/{props.total}</h1>}
      {props.total &&
        <h6 className={classes.summaryDetails}>{percentage(props.count, props.total)}% Complete </h6>}
      {props.dueDate ?
        <h1 className={classes.dueDate}>{calcDays(props.dueDate)} </h1> :
        null}
      {props.dueDate ?
        <h6 className={classes.dueDateDesc}> until due date </h6> : null}
    </div>
  )
}
export default SubmitSummary
