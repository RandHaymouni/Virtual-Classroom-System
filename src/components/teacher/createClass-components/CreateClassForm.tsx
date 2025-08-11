import { useState, useEffect } from "react"
import type React from "react"
import { ChevronLeft, RefreshCw } from "lucide-react"
import styles from "./createClassForm.module.css"
import { useNavigate } from "react-router"

const CreateClassForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        code: "",
        term: "",
        description: "",
        enrollmentKey: "",
        settings: {
            allowComments: false,
            allowLateSubmissions: false,
            showGrades: true,
            sendNotifications: true,
        },
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            settings: {
                ...prev.settings,
                [name]: checked,
            },
        }))
    }

    const generateEnrollmentKey = () => {
        const key = Math.random().toString(36).substring(2, 10).toUpperCase()
        setFormData((prev) => ({
            ...prev,
            enrollmentKey: key,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const response = await fetch('http://localhost:5000/api/classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (response.status === 401) {
                alert('You are not authorized. Please log in.');
                // Optionally redirect to login page
                navigate('/login');
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create class');
            }

            const data = await response.json();
            console.log('Class created:', data);
            alert('Class created successfully!');

            navigate('/teacherDashboard');
        } catch (error: any) {
            alert('Error: ' + error.message);
        }
    };

    const handleCancel = () => {
        navigate("/teacherDashboard")
    }

    const handleBackToDashboard = () => {
        window.scrollTo(0, 0)
        navigate("/teacherDashboard")
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <button onClick={handleBackToDashboard} className={styles.backLink}>
                    <ChevronLeft className={styles.backIcon} />
                    Back to Dashboard
                </button>

                <header className={styles.header}>
                    <h1 className={styles.title}>Create a New Class</h1>
                    <p className={styles.subtitle}>Set up your virtual classroom for students to join</p>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="className" className={styles.label}>
                                Class Name <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., Web Development 101"
                                className={styles.input}
                                required
                                aria-describedby="className-help"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="classCode" className={styles.label}>
                                Class Code <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                id="code"
                                name="code"
                                value={formData.code}
                                onChange={handleInputChange}
                                placeholder="e.g., CSC 2023"
                                className={styles.input}
                                required
                                aria-describedby="classCode-help"
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="term" className={styles.label}>
                            Term <span className={styles.required}>*</span>
                        </label>
                        <select
                            id="term"
                            name="term"
                            value={formData.term}
                            onChange={handleInputChange}
                            className={styles.select}
                            required
                            aria-describedby="term-help"
                        >
                            <option value="">Select term</option>
                            <option value="fall-2023">Fall 2025</option>
                            <option value="spring-2024">Spring 2025</option>
                            <option value="summer-2024">Summer 2025</option>
                            <option value="fall-2024">Fall 2024</option>
                            <option value="spring-2024">Spring 2024</option>
                            <option value="summer-2024">Summer 2024</option>
                            <option value="fall-2023">Fall 2023</option>
                            <option value="spring-2023">Spring 2023</option>
                            <option value="fall-2024">Summer 2023</option>
                            <option value="fall-2023">Fall 2022</option>
                            <option value="spring-2024">Spring 2022</option>
                            <option value="summer-2024">Summer 2022</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="description" className={styles.label}>
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Provide a brief description of your class"
                            className={styles.textarea}
                            aria-describedby="description-help"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="enrollmentKey" className={styles.label}>
                            Enrollment Key <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.enrollmentKeyGroup}>
                            <input
                                type="text"
                                id="enrollmentKey"
                                name="enrollmentKey"
                                value={formData.enrollmentKey}
                                onChange={handleInputChange}
                                placeholder="Generate or create a key"
                                className={`${styles.input} ${styles.enrollmentKeyInput}`}
                                required
                                aria-describedby="enrollmentKey-help"
                            />
                            <button
                                type="button"
                                onClick={generateEnrollmentKey}
                                className={styles.generateButton}
                                aria-label="Generate enrollment key"
                                title="Generate enrollment key"
                            >
                                <RefreshCw className={styles.generateIcon} />
                            </button>
                        </div>
                        <p id="enrollmentKey-help" className={styles.keyHelp}>
                            Students will need this key to join your class. Keep it secure and share only with enrolled students.
                        </p>
                    </div>

                    <div className={styles.settingsSection}>
                        <h2 className={styles.sectionTitle}>Class Settings</h2>
                        <div className={styles.checkboxGrid}>
                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="allowComments"
                                    name="allowComments"
                                    checked={formData.settings.allowComments}
                                    onChange={handleCheckboxChange}
                                    className={styles.checkbox}
                                />
                                <label htmlFor="allowComments" className={styles.checkboxLabel}>
                                    Allow student comments
                                </label>
                            </div>

                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="showGrades"
                                    name="showGrades"
                                    checked={formData.settings.showGrades}
                                    onChange={handleCheckboxChange}
                                    className={styles.checkbox}
                                />
                                <label htmlFor="showGrades" className={styles.checkboxLabel}>
                                    Show grades to students
                                </label>
                            </div>

                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="allowLateSubmissions"
                                    name="allowLateSubmissions"
                                    checked={formData.settings.allowLateSubmissions}
                                    onChange={handleCheckboxChange}
                                    className={styles.checkbox}
                                />
                                <label htmlFor="allowLateSubmissions" className={styles.checkboxLabel}>
                                    Allow late submissions
                                </label>
                            </div>

                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="sendNotifications"
                                    name="sendNotifications"
                                    checked={formData.settings.sendNotifications}
                                    onChange={handleCheckboxChange}
                                    className={styles.checkbox}
                                />
                                <label htmlFor="sendNotifications" className={styles.checkboxLabel}>
                                    Send email notifications
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoBox}>
                        <h3 className={styles.infoTitle}>What happens next?</h3>
                        <ul className={styles.infoList}>
                            <li className={styles.infoItem}>Your class will be created and ready for students</li>
                            <li className={styles.infoItem}>Share the enrollment key with your students</li>
                            <li className={styles.infoItem}>Start creating assignments and course materials</li>
                            <li className={styles.infoItem}>Invite students via email or class announcements</li>
                        </ul>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.createButton}
                            disabled={!formData.title || !formData.code || !formData.term || !formData.enrollmentKey}
                        >
                            Create Class
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateClassForm
