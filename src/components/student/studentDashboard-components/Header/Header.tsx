import styles from './Header.module.css';

interface HeaderProps {
  studentName: string;
}

const Header = (props: HeaderProps) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.welcome}>Welcome back, {props.studentName}!</h1>
      <p className={styles.subtitle}>Here's what's happening in your classes today.</p>
    </div>
  );
}

export default Header;