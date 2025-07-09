import classes from './submitSummary.module.css'
import type {ISummary } from '../types';

const percentage = (count: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((count / total) * 100).toString();
}
const calcDays = (date: string): string => {
  const dueDate = new Date(date);
  const currentDate = new Date();
  dueDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const timeDifference = dueDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference > 0 ? `${Math.abs(daysDifference)} days ` : "Due today";

};
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
