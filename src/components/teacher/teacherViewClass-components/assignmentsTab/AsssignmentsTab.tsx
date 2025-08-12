import React, { useEffect, useState } from "react";
import { Plus, ExternalLink, Clock, CheckCircle } from "lucide-react";
import styles from "./assignmentsTab.module.css";
import { useNavigate } from "react-router";

interface AssignmentsTabProps {
    classId: string;
}

interface AssignmentInterface {
    _id: string;
    title: string;
    assignmentType: "project" | "quiz" | "assignment" | "exam";
    points: number;
    dueDate: string;
    instructions: string;
    settings?: {
        allowLateSubmissions?: boolean;
        requireSubmission?: boolean;
        showPoints?: boolean;
        notifyStudents?: boolean;
    };
}

const AssignmentsTab = ({ classId }: AssignmentsTabProps) => {
    const [assignments, setAssignments] = useState<AssignmentInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`http://localhost:5000/api/classes/${classId}/assignments`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                // const text = await response.text();

                const data = await response.json();
                console.log("Raw response text:", data);


                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch assignments");
                }

                setAssignments(data.data);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [classId]);

    const getStatusBadge = (dueDateStr: string) => {
        const dueDate = new Date(dueDateStr);
        const now = new Date();

        if (dueDate < now) {
            return `${styles.statusBadge} ${styles.statusGraded}`;
        }
        return `${styles.statusBadge} ${styles.statusActive}`;
    };

    const getTypeIcon = (statusClassName: string) => {
        const isGraded = statusClassName.includes(styles.statusGraded);

        return (
            <div className={`${styles.typeIcon} ${isGraded ? styles.gradedIcon : styles.activeIcon}`}>
                {isGraded ? <CheckCircle className={styles.iconSymbol} /> : <Clock className={styles.iconSymbol} />}
            </div>
        );
    };

    const handleCreateAssignment = () => {
        window.scrollTo(0, 0);
        navigate(`/createAssignments/${classId}`);
    };

    const handleViewDetails = (assignmentId: string) => {
        window.scrollTo(0, 0);
        navigate(`/teacherAssignmentDetails/${assignmentId}`);
    };

    if (loading) return <div>Loading assignments...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>All Assignments</h2>
                <button onClick={handleCreateAssignment} className={styles.createButton}>
                    <Plus className={styles.plusIcon} />
                    Create Assignment
                </button>
            </div>

            <div className={styles.assignmentsList}>
                {assignments.length === 0 && <p>No assignments found.</p>}

                {assignments.map((assignment) => {
                    const statusClass = getStatusBadge(assignment.dueDate);
                    const dueDateFormatted = new Date(assignment.dueDate).toLocaleString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    return (
                        <div key={assignment._id} className={styles.assignmentCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.assignmentInfo}>
                                    {getTypeIcon(statusClass)}
                                    <div className={styles.assignmentDetails}>
                                        <h3 className={styles.assignmentTitle}>{assignment.title}</h3>
                                        <p className={styles.assignmentMeta}>
                                            {assignment.assignmentType.charAt(0).toUpperCase() + assignment.assignmentType.slice(1)} • {assignment.points} points
                                            <br /> Due {dueDateFormatted}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.cardActions}>
                                    <span className={statusClass}>{statusClass.includes(styles.statusGraded) ? "Graded" : "Active"}</span>
                                    <button onClick={() => handleViewDetails(assignment._id)} className={styles.viewButton}>
                                        <ExternalLink className={styles.viewIcon} />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AssignmentsTab;
