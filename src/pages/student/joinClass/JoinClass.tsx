import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Users, X } from 'lucide-react';
import styles from './JoinClass.module.css';

const JoinClass = () => {
  const navigate = useNavigate();
  const [enrollmentKey, setEnrollmentKey] = useState('');
  const [classInfo, setClassInfo] = useState<null | {
    id: string;
    title: string;
    code: string;
    description?: string;
    color?: string;
  }>(null);
  const [showClassInfo, setShowClassInfo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // **أضفت هذه الحالة**
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFind = async () => {
    setLoading(true);
    setError(null);
    setShowClassInfo(false);
    setClassInfo(null);
    // **مسحت رسالة النجاح قبل كل عملية بحث جديدة**
    setSuccessMessage(null);

    try {
      const response = await fetch('http://localhost:5000/api/classes/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          enrollmentKey,
          action: 'find'
        }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.success) {
          // alert('Class found successfully!');
          setClassInfo(data.data);
          setShowClassInfo(true);
          setSuccessMessage('Class found successfully!');
        }
      } else {
        setError(data.message || 'Failed to find class');
        alert(data.message || 'Failed to find class');
      }
    } catch {
      setError('Error occurred while finding class');
      alert('Error occurred while finding class');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClass = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/classes/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          enrollmentKey,
          action: 'join'
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('You have successfully joined the class!');
        navigate('/studentDashboard');
      } else {
        alert(data.message || 'Failed to join class');
      }
    } catch {
      alert('Error occurred while joining class');
    } finally {
      setLoading(false);
    }
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
            <button className={styles.findButton} onClick={handleFind} disabled={loading}>
              {loading ? 'Loading...' : 'Find'}
            </button>
          </div>
          <p className={styles.hint}>
            Enrollment keys are typically 6-8 characters long and contain letters and numbers
          </p>
          {successMessage && (
            <p style={{ color: 'green', marginTop: '10px', fontSize: '20px', fontWeight: 600 }}>{successMessage}</p>
          )}
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={() => navigate('/studentDashboard')}>Cancel</button>
          <button
            className={styles.joinButton}
            onClick={handleJoinClass}
            disabled={!enrollmentKey || loading}
          >
            <Users size={16} />
            Join Class
          </button>
        </div>
      </div>

      {/* Class Info Modal */}
      {showClassInfo && classInfo && (
        <div className={styles.modalOverlay}>
          <div className={styles.detailsModal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Class Details </h3>
              <button onClick={() => setShowClassInfo(false)} className={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.classDetails}>
              <p><strong>Title:</strong> {classInfo.title}</p>
              <p><strong>Code:</strong> {classInfo.code}</p>
              <p><strong>Description:</strong> {classInfo.description || 'No description'}</p>
              <p><strong>Color:</strong> <span style={{ color: classInfo.color }}>{classInfo.color}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JoinClass;
