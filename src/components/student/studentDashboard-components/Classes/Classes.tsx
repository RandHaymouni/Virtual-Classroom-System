import { useEffect, useState } from 'react';
import { Users, BookOpen, Plus } from 'lucide-react';
import styles from './Classes.module.css';
import { useNavigate } from 'react-router';

interface ClassType {
  _id: string;
  title: string;
  code: string;
  color: string;
  students: any[]; 
  recentAssignment?: {
    title: string;
    dueDate: string;
  };
  teacher?: {
    firstName: string;
    lastName: string;
  };
}

const Classes = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getClassColors = (colorClass: string) => {
    const colorMap: { [key: string]: any } = {
      blue: { backgroundColor: '#eff6ff', borderColor: '#bfdbfe' },
      green: { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' },
      purple: { backgroundColor: '#faf5ff', borderColor: '#e9d5ff' },
      orange: { backgroundColor: '#fff7ed', borderColor: '#ffedd5' },
      pink: { backgroundColor: '#fce7f3', borderColor: '#fbcfe8' },
      yellow: { backgroundColor: '#fef3c7', borderColor: '#fde68a' },
      black: { backgroundColor: '#d1d5db', borderColor: '#9ca3af' },
    };
    return colorMap[colorClass] || {};
  };

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/classes', { credentials: 'include' });
        const data = await response.json();
        if (data.success) {
          setClasses(data.data);
        } else {
          alert('Failed to load classes');
        }
      } catch (error) {
        alert('Error loading classes');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <div className={styles.assignmentsHeader}>
        <div>
          <h2 className={styles.cardTitle}>My Classes ({classes.length})</h2>
        </div>
        <button className={styles.joinClassButton} onClick={() => navigate("/joinClass")}>
          <Plus size={16} />
          Join New Class
        </button>
      </div>
      {loading ? (
        <p>Loading classes...</p>
      ) : (
        <div className={styles.classesGrid}>
          {classes.map((classItem) => (
            <div key={classItem._id} className={styles.classCard} style={getClassColors(classItem.color)}>
              <div className={styles.classHeader}>
                <div className={styles.className}>{classItem.title}</div>
                <div className={styles.classCode}>
                  {classItem.code} • {classItem.teacher?.firstName} {classItem.teacher?.lastName}
                </div>
              </div>
              <div className={styles.classStudents}>
                <Users size={16} />
                {classItem.students.length} students
              </div>
              <div className={styles.recentSection}>
                <div className={styles.recentLabel}>Recent:</div>
                <div className={styles.recentAssignment}>
                  <BookOpen size={16} color="#6b7280" />
                  <div>
                    <div className={styles.recentAssignmentTitle}>
                      {classItem.recentAssignment?.title || 'No recent assignment'}
                    </div>
                    <div className={styles.recentAssignmentDue}>
                      {classItem.recentAssignment?.dueDate || '-'}
                    </div>
                  </div>
                </div>
              </div>
              <button
                className={styles.viewClassButton}
                onClick={() => navigate(`/studentviewclass/${classItem._id}`)}
              >
                View Class
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Classes;
