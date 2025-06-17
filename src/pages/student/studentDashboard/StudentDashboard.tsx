import { useState } from 'react';
import styles from './studentDashboard.module.css';
import Header from '../../../components/student/studentDashboard-components/Header/Header';

export const mockData = {
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

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'assignments'>('overview');

  return (
    <div className={styles.container}>
      <Header studentName={mockData.student.name} />
    </div>
  );
}

export default StudentDashboard;