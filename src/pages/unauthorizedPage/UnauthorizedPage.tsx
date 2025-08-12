import { ShieldX, ArrowLeft, LogIn } from "lucide-react"
import { useNavigate } from "react-router-dom";
import styles from "./unauthrizedPage.module.css"

export default function UnauthorizedPage() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate("/Login");
    };

    const handleGoBack = () => {
        navigate(-2);
    };
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.errorCard}>
                        <div className={styles.errorContent}>
                            <div className={styles.iconContainer}>
                                <ShieldX className={styles.errorIcon} />
                            </div>

                            <div className={styles.textContent}>
                                <h1 className={styles.title}>Access Denied</h1>
                                <p className={styles.subtitle}>
                                    You don't have permission to access this page. Please sign in with an authorized account or contact
                                    your administrator.
                                </p>
                                <p className={styles.description}>
                                    EduClass makes online education simple, effective, and secure. Ensure you're using the correct
                                    credentials to access your virtual classroom.
                                </p>
                            </div>

                            <div className={styles.actions}>
                                <button className={styles.primaryButton} onClick={handleSignIn}>
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Log In
                                </button>
                                <button className={styles.secondaryButton} onClick={handleGoBack}>
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureContent}>
                            <div className={styles.featureIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8 7H16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8 11H16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <h3 className={styles.featureTitle}>Secure Learning</h3>
                            <p className={styles.featureDescription}>
                                Protected access to ensure safe and secure learning environment for all students
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <p className={styles.footerText}>Activate Windows</p>
                <p className={styles.footerSubtext}>Go to Settings to activate Windows.</p>
            </footer>
        </div>
    )
}
