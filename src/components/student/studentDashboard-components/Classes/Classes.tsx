import { Users, BookOpen, Plus } from 'lucide-react';
import { mockData } from '../../../../pages/student/studentDashboard/StudentDashboard';
import styles from './Classes.module.css';
import { useNavigate } from 'react-router';

function Classes() {
  const getClassColors = (colorClass: string) => {
    const colorMap: { [key: string]: any } = {
      'bg-green-50 border-green-200': { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' },
      'bg-blue-50 border-blue-200': { backgroundColor: '#eff6ff', borderColor: '#bfdbfe' },
      'bg-purple-50 border-purple-200': { backgroundColor: '#faf5ff', borderColor: '#e9d5ff' }
    };
    return colorMap[colorClass] || {};
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.assignmentsHeader}>
        <div>
          <h2 className={styles.cardTitle}>My Classes ({mockData.classes.length})</h2>
        </div>
        <button className={styles.joinClassButton} onClick={() => navigate("/joinClass")}>
          <Plus size={16} />
          Join New Class
        </button>
      </div>
      <div className={styles.classesGrid}>
        {mockData.classes.map((classItem) => (
          <div key={classItem.id} className={styles.classCard} style={getClassColors(classItem.color)}>
            <div className={styles.classHeader}>
              <div className={styles.className}>{classItem.name}</div>
              <div className={styles.classCode}>{classItem.code} • {classItem.instructor}</div>
            </div>
            <div className={styles.classStudents}>
              <Users size={16} />
              {classItem.students} students
            </div>
            <div className={styles.recentSection}>
              <div className={styles.recentLabel}>Recent:</div>
              <div className={styles.recentAssignment}>
                <BookOpen size={16} color="#6b7280" />
                <div>
                  <div className={styles.recentAssignmentTitle}>{classItem.recentAssignment.title}</div>
                  <div className={styles.recentAssignmentDue}>{classItem.recentAssignment.dueDate}</div>
                </div>
              </div>
            </div>
            <button className={styles.viewClassButton}>View Class</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classes;