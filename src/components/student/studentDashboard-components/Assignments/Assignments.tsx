import { useState } from 'react';
import { Clock } from 'lucide-react';
import { mockData } from '../../../../pages/student/studentDashboard/StudentDashboard';
import styles from './Assignments.module.css';

const Assignments = () => {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium'>('all');
  const [sort, setSort] = useState<'dueDateAsc' | 'dueDateDesc' | 'pointsAsc' | 'pointsDesc'>('dueDateAsc');

  const filteredAssignments = mockData.assignments.filter((assignment) => 
    filter === 'all' ? true : assignment.priority === filter
  );

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (sort === 'dueDateAsc') {
      return a.dueDate.localeCompare(b.dueDate);
    } else if (sort === 'dueDateDesc') {
      return b.dueDate.localeCompare(a.dueDate);
    } else if (sort === 'pointsAsc') {
      return a.points - b.points;
    } else {
      return b.points - a.points;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.assignmentsHeader}>
        <h2 className={styles.cardTitle}>All Assignments</h2>
        <div className={styles.filterSort}>
          <select 
            className={styles.filterButton}
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'high' | 'medium')}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
          </select>
          <select 
            className={styles.filterButton}
            value={sort}
            onChange={(e) => setSort(e.target.value as 'dueDateAsc' | 'dueDateDesc' | 'pointsAsc' | 'pointsDesc')}
          >
            <option value="dueDateAsc">Due Date (Asc)</option>
            <option value="dueDateDesc">Due Date (Desc)</option>
            <option value="pointsAsc">Points (Asc)</option>
            <option value="pointsDesc">Points (Desc)</option>
          </select>
        </div>
      </div>
      <div className={styles.assignmentsList}>
        {sortedAssignments.map((assignment) => (
          <div key={assignment.id} className={styles.assignmentListItem}>
            <div className={styles.assignmentLeft}>
              <div className={`${styles.assignmentIcon} ${assignment.priority === 'high' ? styles.dueTomorrow : styles.dueFriday}`}>
                <Clock size={12} />
              </div>
              <div>
                <div className={styles.assignmentTitle}>{assignment.title}</div>
                <div className={styles.assignmentSubject}>
                  {assignment.subject} • {assignment.points} points
                </div>
              </div>
            </div>
            <div className={styles.assignmentRight}>
              <div className={`${styles.dueDate} ${assignment.priority === 'high' ? styles.dueTomorrowText : styles.dueFridayText}`}>
                {assignment.dueDate}
              </div>
              <div className={styles.assignmentStatus}>{assignment.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assignments;