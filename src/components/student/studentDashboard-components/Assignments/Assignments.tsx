import { useState } from 'react';
import { Clock } from 'lucide-react';
import styles from './Assignments.module.css';

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