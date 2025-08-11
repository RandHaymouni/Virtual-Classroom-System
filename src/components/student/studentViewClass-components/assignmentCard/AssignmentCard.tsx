import classes from "./assignmentCard.module.css"
import { HiExternalLink } from "react-icons/hi"
import { LuClock } from "react-icons/lu"
import { FiCheckCircle } from "react-icons/fi"
import type { IAssignmentData } from "../types"
import { CiCircleCheck } from "react-icons/ci"

const AssignmentCard = (props: IAssignmentData) => {
  const getStatusIcon = () => {
    switch (props.status) {
      case "Submitted":
        return <FiCheckCircle className={classes.statusIcon} />
      case "Not Submitted":
        return <LuClock className={classes.statusIcon} />
      case "Graded":
        return <CiCircleCheck className={classes.statusIcon} />
      default:
        return <LuClock className={classes.statusIcon} />
    }
  }

  const getStatusClass = () => {
    switch (props.status) {
      case "Submitted":
        return classes.statusSubmitted
      case "Not Submitted":
        return classes.statusNotSubmitted
      case "Graded":
        return classes.statusGraded
      default:
        return classes.statusNotSubmitted
    }
  }

  return (
    <div className={classes.assignmentCard}>
      <div className={classes.cardContent}>
        <div className={classes.assignmentHeader}>
          <div className={classes.iconAndTitle}>
            {getStatusIcon()}
            <div className={classes.titleSection}>
              <h3 className={classes.assignmentTitle}>{props.title}</h3>
              <div className={classes.assignmentMeta}>
                <span className={classes.assignmentType}>{props.type}</span>
                <span className={classes.separator}>•</span>
                <span className={classes.points}>{props.points} points</span>
                <span className={classes.separator}>•</span>
                <span className={classes.dueDate}>Due {props.dueDate}</span>
              </div>
            </div>
          </div>

          <div className={classes.cardActions}>
            <span className={`${classes.statusBadge} ${getStatusClass()}`}>{props.status}</span>
            <button
              className={classes.detailsBtn}
              onClick={() => {
                window.location.href = "studentAssignmentDetails"
              }}
            >
              View Details
              <HiExternalLink />
            </button>
          </div>
        </div>

        {props.status === "Submitted" && props.submissionDate && (
          <div className={classes.submissionInfo}>
            <span className={classes.submissionText}>Submitted on {props.submissionDate} • Awaiting grade</span>
          </div>
        )}

        {props.status === "Graded" && props.grade && (
          <div className={classes.gradeInfo}>
            <span className={classes.gradeText}>
              Grade: {props.grade}% ({Math.round((props.grade * props.points) / 100)}/{props.points})
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssignmentCard
