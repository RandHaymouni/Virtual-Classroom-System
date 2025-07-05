import styles from './Tabs.module.css';

interface TabsProps {
  activeTab: 'overview' | 'classes' | 'assignments';
  setActiveTab: (tab: 'overview' | 'classes' | 'assignments') => void;
}

function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
        onClick={() => setActiveTab('overview')}
      >
        Overview
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'classes' ? styles.activeTab : ''}`}
        onClick={() => setActiveTab('classes')}
      >
        My Classes
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'assignments' ? styles.activeTab : ''}`}
        onClick={() => setActiveTab('assignments')}
      >
        Assignments
      </button>
    </div>
  );
}

export default Tabs;