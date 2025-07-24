import type { ReactNode } from 'react';
import Navbar from '../components/navbar/Navbar'; 
// import styles from './MainLayout.module.css'; 
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      {/* <div className={styles.pageContent}> */}
        {children}
      {/* </div> */}
    </>
  );
};

export default MainLayout;
