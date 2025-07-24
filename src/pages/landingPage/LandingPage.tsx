import { GraduationCap, BookOpen, Users } from "lucide-react"
import styles from "./landingPage.module.css"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
	const navigate = useNavigate()

	const handleGetStarted = () => {
		console.log("Get Started clicked")
		navigate("/signup")
	}

	const handleLogIn = () => {
		console.log("Sign In clicked")
		navigate("/login")
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.headerContent}>
					<div className={styles.logoSection}>
						<div className={styles.logoIcon}>
							<GraduationCap />
						</div>
						<h1 className={styles.logoText}>EduClass</h1>
					</div>
					<div className={styles.headerButtons}>
						<button className={styles.logInButton} onClick={handleLogIn}>
							Sign In
						</button>
						<button className={styles.getStartedButton} onClick={handleGetStarted}>
							Get Started
						</button>
					</div>
				</div>
			</header>

			<main className={styles.main}>
				<div className={styles.mainContent}>
					<section className={styles.heroSection}>
						<div className={styles.heroContent}>
							<h2 className={styles.heroTitle}>
								Transform Your <span className={styles.heroTitleHighlight}>Teaching</span> Experience
							</h2>
							<p className={styles.heroDescription}>
								Create engaging virtual classrooms, manage assignments effortlessly, and connect with students like
								never before. EduClass makes online education simple, effective, and enjoyable.
							</p>
						</div>

						<div className={styles.heroIllustration}>
							<div className={styles.illustrationCard}>
								<div className={styles.illustrationIcons}>
									<div className={styles.iconWrapper}>
										<BookOpen />
									</div>
									<div className={styles.iconWrapper}>
										<Users />
									</div>
									<div className={`${styles.iconWrapper} ${styles.primary}`}>
										<GraduationCap />
									</div>
								</div>
								<h3 className={styles.illustrationTitle}>Virtual Classroom</h3>
								<p className={styles.illustrationDescription}>
									Interactive learning environment with real-time collaboration
								</p>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}

export default LandingPage