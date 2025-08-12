import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./stdViewClass.module.css";
import type { IClassData } from "../types";
import { IoMdArrowRoundBack } from "react-icons/io";

const StdViewClass = (props: IClassData) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("assignments");
  const [classData, setClassData] = useState<IClassData | null>(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        if (!id) return;

        const res = await fetch(`http://localhost:5000/api/classes/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch class details");

        const data = await res.json();

        setClassData({
          className: data.data.title,
          classDetails: `${data.data.code} • ${data.data.term} • ${data.data.teacher?.firstName || ""} ${data.data.teacher?.lastName || ""}`,
          onTabChange: () => { },
        });
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [id]);

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName)
    props.onTabChange(tabName)
  }

  if (!classData) {
    return <div className={classes.loading}>Loading class details...</div>;
  }

  return (
    <div className={classes.container}>
      <button
        className={classes.backButton}
        onClick={() => navigate("/studentDashboard")}
      >
        <IoMdArrowRoundBack />
        <span>Back to Dashboard</span>
      </button>

      <div className={classes.classHeader}>
        <div className={classes.classInfo}>
          <h1 className={classes.className}>{classData.className}</h1>
          <p className={classes.classDetails}>{classData.classDetails}</p>
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

        <div className={classes.tabContent}>
          {selectedTab === "assignments"}
          {selectedTab === "materials"}
          {selectedTab === "myGrades"}
        </div>
      </div>
    </div>
  );
};

export default StdViewClass;
