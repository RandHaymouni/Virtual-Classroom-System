import { useState, useRef, useEffect } from "react"
import { GraduationCap, User, Settings, LogOut } from "lucide-react"
import styles from "./navbar.module.css"

const Navbar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	const handleUserClick = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	const handleDropdownAction = (action: string) => {
		console.log(`${action} clicked`)
		setIsDropdownOpen(false)
	}

	return (
		<>
			{/* Main Navbar */}
			<nav className={styles.navbar}>
				<div className={styles.navbarContent}>
					{/* Logo Section */}
					<div className={styles.logoSection}>
						<div className={styles.logoIcon}>
							<GraduationCap />
						</div>
						<h1 className={styles.logoText}>EduClass</h1>
					</div>

					{/* Navigation Links */}
					<div className={styles.navigation}>
						<a href="#" className={`${styles.navLink} ${styles.active}`}>
							Dashboard
						</a>
						<a href="#" className={styles.navLink}>
							Calendar
						</a>
						<a href="#" className={styles.navLink}>
							Notifications
						</a>
					</div>

					{/* User Section */}
					<div className={styles.userSection} ref={dropdownRef}>
						<button className={styles.userButton} onClick={handleUserClick}>
							<div className={styles.userAvatar}>JS</div>
						</button>

						{/* User Dropdown */}
						<div className={`${styles.userDropdown} ${!isDropdownOpen ? styles.hidden : ""}`}>
							<div className={styles.userInfo}>
								<p className={styles.userName}>John Smith</p>
								<p className={styles.userEmail}>john.smith@teacher.edu</p>
							</div>
							<div className={styles.dropdownMenu}>
								<button className={styles.dropdownItem} onClick={() => handleDropdownAction("Profile")}>
									<User />
									Profile
								</button>
								<button className={styles.dropdownItem} onClick={() => handleDropdownAction("Settings")}>
									<Settings />
									Settings
								</button>
								<button
									className={`${styles.dropdownItem} ${styles.logout}`}
									onClick={() => handleDropdownAction("Logout")}
								>
									<LogOut />
									Log out
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav >

			{/* Content Area with Sample Class Card
			< div className={styles.contentArea} >
			</div > */}
		</>
	)
}

export default Navbar