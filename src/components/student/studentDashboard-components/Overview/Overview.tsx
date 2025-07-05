import { Users, Clock, BookOpen } from 'lucide-react';
import { mockData } from '../../../../pages/student/studentDashboard/StudentDashboard';
import styles from './Overview.module.css';

interface overviewProps {
  setAvtiveTap: (tab: "overview" | "classes" | "assignments") => void
}

function Overview(props : overviewProps) {
  return (
    <div>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <Users className={styles.statIcon} size={24} />
          <div className={styles.statNumber}>{mockData.student.enrolledClasses}</div>
          <div className={styles.statLabel}>Enrolled Classes</div>
        </div>
        <div className={styles.statCard}>
          <Clock className={styles.statIcon} color="#f59e0b" size={24} />
          <div className={styles.statNumber}>{mockData.student.assignmentsDueThisWeek}</div>
          <div className={styles.statLabel}>Due This Week</div>
        </div>
        <div className={styles.statCard}>
          <BookOpen className={styles.statIcon} color="#3b82f6" size={24} />
          <div className={styles.statNumber}>{mockData.student.averageGrade}%</div>
          <div className={styles.statLabel}>Average Grade</div>
        </div>
      </div>

      <div className={styles.assignmentsCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>Upcoming Assignments</div>
          <div className={styles.cardSubtitle}>Don't forget about these upcoming deadlines</div>
        </div>
        {mockData.assignments.map((assignment) => (
          <div key={assignment.id} className={styles.assignmentItem}>
            <div className={styles.assignmentLeft}>
              <div className={`${styles.assignmentIcon} ${assignment.priority === 'high' ? styles.dueTomorrow : styles.dueFriday}`}>
                <Clock size={12} />
              </div>
              <div>
                <div className={styles.assignmentTitle}>{assignment.title}</div>
                <div className={styles.assignmentSubject}>{assignment.subject}</div>
              </div>
            </div>
            <div className={styles.assignmentRight}>
              <div className={`${styles.dueDate} ${assignment.priority === 'high' ? styles.dueTomorrowText : styles.dueFridayText}`}>
                {assignment.dueDate}
              </div>
              <div className={styles.dueTime}>{assignment.dueTime}</div>
            </div>
          </div>
        ))}
        <button className={styles.viewAllButton}
                onClick={() => props.setAvtiveTap("assignments")}>
                    View All Assignments</button>
      </div>
    </div>
  );
}

export default Overview;