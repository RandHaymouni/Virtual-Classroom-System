import { useState } from "react"
import StdViewClass from "../../../components/student/studentViewClass-components/viewClass/stdViewClass"
import AssignmentCard from "../../../components/student/studentViewClass-components/assignmentCard/AssignmentCard"
import MaterialsTab from "../../../components/student/studentViewClass-components/materialsTab/MaterialsTab"
import type { IAssignmentData } from "../../../components/student/studentViewClass-components/types"
import classes from './studentViewClass.module.css'

const sampleAssignments: IAssignmentData[] = [
    {
        id: "1",
        title: "Building a Web Application",
        type: "Final Project",
        points: 100,
        dueDate: "May 25, 2025 at 11:59 PM",
        status: "Not Submitted",
    },
    {
        id: "2",
        title: "JavaScript Fundamentals",
        type: "Quiz #3",
        points: 50,
        dueDate: "May 17, 2025 at 11:59 PM",
        status: "Submitted",
        submissionDate: "May 19, 2025",
    },
    {
        id: "3",
        title: "React Components",
        type: "Assignment #4",
        points: 75,
        dueDate: "May 20, 2025 at 11:59 PM",
        status: "Submitted",
        submissionDate: "May 19, 2025",
    },
    {
        id: "4",
        title: "Midterm Exam",
        type: "Exam",
        points: 150,
        dueDate: "April 15, 2025 at 11:59 PM",
        status: "Graded",
        grade: 90,
    },
]

export default function Page() {
    const [activeTab, setActiveTab] = useState("assignments")

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName)
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "assignments":
                return (
                    <div style={{ padding: "0 2rem 2rem 2rem" }}>
                        <div className={classes.contentSection}>
                            <div className={classes.sectionHeader}>
                                <h2 className={classes.sectionTitle}>All Assignments</h2>
                            </div>
                        </div>
                        {sampleAssignments.map((assignment) => (
                            <AssignmentCard key={assignment.id} {...assignment} />
                        ))}
                    </div>
                )
            case "materials":
                return <MaterialsTab />
            case "myGrades":
                return (
                    <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                        <h3>My Grades</h3>
                        <p>Grades functionality coming soon...</p>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div>
            <StdViewClass
                className="Web Development 101"
                classId="CSC 2023 • Spring 2025 • Dr. John Smith"
                classDetails="CSC 2023 • Spring 2025 • Dr. John Smith"
                onTabChange={handleTabChange}
            />
            {renderTabContent()}
        </div>
    )
}