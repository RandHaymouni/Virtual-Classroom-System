import { Download, TrendingUp, TrendingDown, Minus } from "lucide-react"
import styles from "./gradeBookTab.module.css"

interface IGradebookTabProps {
    classId: string
}

interface IStudentGrade {
    studentId: number
    studentName: string
    quiz1: {
        score: number;
        total: number;
    } | null
    quiz2: {
        score: number;
        total: number;
    } | null
    quiz3: {
        score: number;
        total: number;
    } | null
    midterm: {
        score: number;
        total: number;
    } | null
    finalProject: {
        score: number;
        total: number;
    } | null
    overall: number
};

const mockGrades: IStudentGrade[] = [
    {
        studentId: 1,
        studentName: "Student Name 1",
        quiz1: { score: 46, total: 50 },
        quiz2: { score: 48, total: 50 },
        quiz3: { score: 44, total: 50 },
        midterm: { score: 90, total: 100 },
        finalProject: { score: 95, total: 100 },
        overall: 86,
    },
    {
        studentId: 2,
        studentName: "Student Name 2",
        quiz1: { score: 43, total: 50 },
        quiz2: { score: 47, total: 50 },
        quiz3: { score: 47, total: 50 },
        midterm: { score: 84, total: 100 },
        finalProject: { score: 99, total: 100 },
        overall: 92,
    },
    {
        studentId: 3,
        studentName: "Student Name 3",
        quiz1: { score: 43, total: 50 },
        quiz2: { score: 40, total: 50 },
        quiz3: { score: 43, total: 50 },
        midterm: { score: 88, total: 100 },
        finalProject: { score: 95, total: 100 },
        overall: 88,
    },
    {
        studentId: 4,
        studentName: "Student Name 4",
        quiz1: { score: 43, total: 50 },
        quiz2: { score: 48, total: 50 },
        quiz3: { score: 41, total: 50 },
        midterm: { score: 87, total: 100 },
        finalProject: null,
        overall: 72,
    },
    {
        studentId: 5,
        studentName: "Student Name 5",
        quiz1: { score: 43, total: 50 },
        quiz2: { score: 41, total: 50 },
        quiz3: { score: 45, total: 50 },
        midterm: { score: 98, total: 100 },
        finalProject: null,
        overall: 75,
    },
]

const classStats = {
    average: 87,
    highest: 96,
    lowest: 72,
}

const GradeBookTab = ({ classId }: IGradebookTabProps) => {
    const renderGrade = (grade: { score: number; total: number } | null) => {
        if (!grade) {
            return <span className={styles.notSubmitted}>Not submitted</span>
        }
        return `${grade.score}/${grade.total}`
    }

    const getPerformanceIcon = (percentage: number) => {
        if (percentage >= 90) {
            return <TrendingUp className={`${styles.performanceIcon} ${styles.high}`} />
        } else if (percentage >= 80) {
            return <Minus className={`${styles.performanceIcon} ${styles.medium}`} />
        } else {
            return <TrendingDown className={`${styles.performanceIcon} ${styles.low}`} />
        }
    }

    const handleExportGrades = () => {
        window.scrollTo(0, 0);
        console.log("Export Grades clicked");
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Gradebook</h2>
                <button onClick={handleExportGrades} className={styles.exportButton}>
                    <Download className={styles.exportIcon} />
                    Export Grades
                </button>
            </div>

            <div className={styles.statsContainer}>
                <div className={styles.statCard}>
                    <h3 className={styles.statTitle}>Class Average</h3>
                    <div className={styles.statValue}>{classStats.average}%</div>
                    <div className={styles.statSubtext}>B+ average</div>
                </div>
                <div className={styles.statCard}>
                    <h3 className={styles.statTitle}>Highest Grade</h3>
                    <div className={styles.statValue}>{classStats.highest}%</div>
                    <div className={styles.statSubtext}>A</div>
                </div>
                <div className={styles.statCard}>
                    <h3 className={styles.statTitle}>Lowest Grade</h3>
                    <div className={styles.statValue}>{classStats.lowest}%</div>
                    <div className={styles.statSubtext}>C-</div>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.gradesTable}>
                    <thead>
                        <tr className={styles.tableHeader}>
                            <th className={styles.headerCell}>Student</th>
                            <th className={styles.headerCell}>Quiz #1</th>
                            <th className={styles.headerCell}>Quiz #2</th>
                            <th className={styles.headerCell}>Quiz #3</th>
                            <th className={styles.headerCell}>Midterm</th>
                            <th className={styles.headerCell}>Final Project</th>
                            <th className={styles.headerCell}>Overall</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockGrades.map((student) => (
                            <tr key={student.studentId} className={styles.tableRow}>
                                <td className={styles.studentCell}>
                                    <div className={styles.studentInfo}>
                                        <span className={styles.studentName}>{student.studentName}</span>
                                        {getPerformanceIcon(student.overall)}
                                    </div>
                                </td>
                                <td className={styles.gradeCell}>{renderGrade(student.quiz1)}</td>
                                <td className={styles.gradeCell}>{renderGrade(student.quiz2)}</td>
                                <td className={styles.gradeCell}>{renderGrade(student.quiz3)}</td>
                                <td className={styles.gradeCell}>{renderGrade(student.midterm)}</td>
                                <td className={styles.gradeCell}>{renderGrade(student.finalProject)}</td>
                                <td className={styles.overallCell}>
                                    <span className={styles.overallGrade}>{student.overall}%</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GradeBookTab
