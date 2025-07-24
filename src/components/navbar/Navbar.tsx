import { useState, useRef, useEffect } from "react"
import { GraduationCap, User, Settings, LogOut } from "lucide-react"
import styles from "./navbar.module.css"
import { useNavigate } from "react-router"

const Navbar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	 const navigate = useNavigate()

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
		 if (action === "Logout") {
      localStorage.removeItem("token") 
      navigate("/login");
    } else {
      console.log(`${action} clicked`);
    }
    setIsDropdownOpen(false);
	}

	return (
		<>
			<nav className={styles.navbar}>
				<div className={styles.navbarContent}>
					<div className={styles.logoSection}>
						<div className={styles.logoIcon}>
							<GraduationCap />
						</div>
						<h1 className={styles.logoText}>EduClass</h1>
					</div>
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
					<div className={styles.userSection} ref={dropdownRef}>
						<button className={styles.userButton} onClick={handleUserClick}>
							<div className={styles.userAvatar}>JS</div>
						</button>
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
		</>
	)
}

export default Navbar