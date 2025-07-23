import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Users } from 'lucide-react';
import styles from './JoinClass.module.css';

const JoinClass = () => {
  const navigate = useNavigate();
  const [enrollmentKey, setEnrollmentKey] = useState('');

  const handleFind = () => {
    console.log('Finding class with key:', enrollmentKey);
  };

  const handleJoinClass = () => {
    console.log('Joining class with key:', enrollmentKey);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton} onClick={() => navigate('/studentDashboard')}>
        ← Back to Dashboard
      </div>
      <div className={styles.header}>
        <div className={styles.icon}>
          <Users size={40} />
        </div>
      </div>
      <div className={styles.header}>
        <h2 className={styles.title}>Join a Class</h2>
      </div>
      <p className={styles.description}>
        Enter the enrollment key provided by your teacher to join their virtual classroom
      </p>
        <div className={styles.card}>
            <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>Enter Enrollment Key</h3>
                <p className={styles.cardDescription}>
                Your teacher will provide you with a unique enrollment key to access their class
                </p>
                <div className={styles.inputGroup}>
                <input
                    type="text"
                    placeholder="Enter 8-character key (e.g., ABC123XY)"
                    value={enrollmentKey}
                    onChange={(e) => setEnrollmentKey(e.target.value)}
                    className={styles.input}
                />
                <button className={styles.findButton} onClick={handleFind}>
                    Find
                </button>
                </div>
                <p className={styles.hint}>
                Enrollment keys are typically 6-8 characters long and contain letters and numbers
                </p>
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.cancelButton}>Cancel</button>
                <button
                className={styles.joinButton}
                onClick={handleJoinClass}
                disabled={!enrollmentKey}
                >
                <Users size={16} />
                Join Class
                </button>
            </div>
        </div>
      <div className={styles.helpSection}>
        <div className={styles.header}>
        <h3 className={styles.helpTitle}>Need help finding your enrollment key?</h3>
        </div>
        <ul className={styles.helpList}>
          <li className={styles.helpItem}>Check your email for an invitation from your teacher</li>
          <li className={styles.helpItem}>Look for the key on your class syllabus or course materials</li>
          <li className={styles.helpItem}>Ask your teacher or classmates for the enrollment key</li>
          <li className={styles.helpItem}>Contact your school’s IT support if you’re still having trouble</li>
        </ul>
      </div>
    </div>
  );
}

export default JoinClass;