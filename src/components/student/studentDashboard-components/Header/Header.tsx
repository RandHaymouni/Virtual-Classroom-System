import styles from './Header.module.css';

interface HeaderProps {
  firstName: string;
  lastName: string;
}

const Header = ({ firstName, lastName }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.welcome}>Welcome back, {firstName} {lastName}!</h1>
      <p className={styles.subtitle}>Here's what's happening in your classes today.</p>
    </div>
  );
};

export default Header;
