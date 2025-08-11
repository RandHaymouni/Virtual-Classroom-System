import { useState } from "react"
import classes from "./stdViewClass.module.css"
import type { IClassData } from "../types"
import { IoMdArrowRoundBack } from "react-icons/io"

const StdViewClass = (props: IClassData) => {
  const [selectedTab, setSelectedTab] = useState("assignments")

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName)
    props.onTabChange(tabName)
  }

  return (
    <div className={classes.container}>
      <button className={classes.backButton} onClick={() => (window.location.href = "/studentDashboard")}>
        <IoMdArrowRoundBack />
        <span>Back to Dashboard</span>
      </button>

      <div className={classes.classHeader}>
        <div className={classes.classInfo}>
          <h1 className={classes.className}>{props.className}</h1>
          <p className={classes.classDetails}>{props.classDetails}</p>
        </div>
      </div>

      <div className={classes.classContent}>
        <div className={classes.tabs}>
          <button
            className={`${classes.tabBtn} ${selectedTab === "assignments" ? classes.selectedTab : ""}`}
            onClick={() => handleTabClick("assignments")}
          >
            Assignments
          </button>
          <button
            className={`${classes.tabBtn} ${selectedTab === "materials" ? classes.selectedTab : ""}`}
            onClick={() => handleTabClick("materials")}
          >
            Materials
          </button>
          <button
            className={`${classes.tabBtn} ${selectedTab === "myGrades" ? classes.selectedTab : ""}`}
            onClick={() => handleTabClick("myGrades")}
          >
            My Grades
          </button>
        </div>
      </div>
    </div>
  )
}

export default StdViewClass
