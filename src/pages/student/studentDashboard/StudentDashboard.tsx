import { useState, useEffect } from 'react';
import styles from './studentDashboard.module.css';
import Header from '../../../components/student/studentDashboard-components/Header/Header';
import Tabs from '../../../components/student/studentDashboard-components/Tabs/Tabs';
import Overview from '../../../components/student/studentDashboard-components/Overview/Overview';
import Classes from '../../../components/student/studentDashboard-components/Classes/Classes';
import Assignments from '../../../components/student/studentDashboard-components/Assignments/Assignments';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'assignments'>('overview');

  // حالة لتخزين بيانات المستخدم الحقيقية
  const [studentData, setStudentData] = useState<{ firstName: string; lastName: string } | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/student/profile', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user data');
        return res.json();
      })
      .then(data => {
        console.log("Data:", data);
        if (data.success && data.data) {
          setStudentData({
            firstName: data.data.firstName,
            lastName: data.data.lastName
          });
        }
      })
      .catch(err => {
        console.error('Error fetching student profile:', err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Header
        firstName={studentData?.firstName || ''}
        lastName={studentData?.lastName || ''}
      />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.content}>
        {activeTab === "overview" && <Overview setAvtiveTap={setActiveTab} />}
        {activeTab === "classes" && <Classes />}
        {activeTab === "assignments" && <Assignments />}
      </div>
    </div>
  );
}

export default StudentDashboard;
