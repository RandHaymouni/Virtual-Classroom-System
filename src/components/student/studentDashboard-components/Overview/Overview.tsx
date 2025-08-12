import { Users, Clock, BookOpen } from 'lucide-react';
import styles from './Overview.module.css';

 const mockData = {
  student: {
    name: 'Alex',
    enrolledClasses: 3,
    assignmentsDueThisWeek: 2,
    averageGrade: 87
  },
  classes: [
    {
      id: 1,
      name: 'Introduction to Psychology',
      code: 'PSY 101',
      instructor: 'Dr. Sarah Johnson',
      students: 25,
      color: 'bg-green-50 border-green-200',
      recentAssignment: {
        title: 'Research Paper',
        dueDate: 'Due tomorrow'
      }
    },
    {
      id: 2,
      name: 'Advanced Mathematics',
      code: 'MATH 301',
      instructor: 'Prof. Michael Chen',
      students: 18,
      color: 'bg-blue-50 border-blue-200',
      recentAssignment: {
        title: 'Problem Set #8',
        dueDate: 'Due Friday'
      }
    },
    {
      id: 3,
      name: 'Creative Writing Workshop',
      code: 'ENG 250',
      instructor: 'Ms. Emily Rodriguez',
      students: 16,
      color: 'bg-purple-50 border-purple-200',
      recentAssignment: {
        title: 'Short Story Draft',
        dueDate: 'Due next week'
      }
    }
  ],
  assignments: [
    {
      id: 1,
      title: 'Psychology Research Paper',
      subject: 'Introduction to Psychology',
      dueDate: 'Due Tomorrow',
      dueTime: '11:59 PM',
      points: 100,
      status: 'Not submitted',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Calculus Problem Set #8',
      subject: 'Advanced Mathematics',
      dueDate: 'Due Friday',
      dueTime: '11:59 PM',
      points: 50,
      status: 'Not submitted',
      priority: 'medium'
    }
  ]
};

interface overviewProps {
  setAvtiveTap: (tab: "overview" | "classes" | "assignments") => void
}

const Overview = (props: overviewProps) => {
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