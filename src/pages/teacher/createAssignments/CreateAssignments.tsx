import { useState } from 'react';
import { Paperclip } from 'lucide-react';
import styles from './createAssignments.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const CreateAssignment = () => {
    const { id } = useParams<{ id: string }>();  // نجيب id من المسار
    const navigate = useNavigate();

    const classId = id || '';  // نستخدم id كـ classId

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [points, setPoints] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [instructions, setInstructions] = useState('');
    const [attachments, setAttachments] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachments(Array.from(e.target.files));
        }
    };

    const handleSubmit = async () => {
        if (!classId) {
            alert('Class ID not found');
            return;
        }

        const formData = new FormData();

        formData.append('title', title);
        formData.append('assignmentType', type);
        formData.append('points', points);
        formData.append('dueDate', dueDate);
        formData.append('instructions', instructions);
        formData.append('class', classId);

        formData.append(
            'settings',
            JSON.stringify({
                lateSubmissions:
                    (document.getElementById('lateSubmissions') as HTMLInputElement | null)?.checked || false,
                showPoints:
                    (document.getElementById('showPoints') as HTMLInputElement | null)?.checked || false,
                requireSubmission:
                    (document.getElementById('requireSubmission') as HTMLInputElement | null)?.checked || false,
                notifyStudents:
                    (document.getElementById('notifyStudents') as HTMLInputElement | null)?.checked || false,
            })
        );

        attachments.forEach((file) => {
            formData.append('attachments', file);
        });

        try {
            const res = await fetch('http://localhost:5000/api/assignments', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (res.ok) {
                navigate(`/class/${classId}`);
            } else {
                console.error('Failed to create assignment');
            }
        } catch (error) {
            console.error('Error submitting assignment:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.backLink} onClick={() => navigate(`/class/${classId}`)}>
                ← Back to Class
            </div>
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <h2 className={styles.title}>Create Assignment</h2>
                    <div className={styles.header}>
                        <p className={styles.description}>Create a new assignment for your students</p>
                    </div>
                    <div className={styles.formSection}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Assignment Title *</label>
                            <input
                                type="text"
                                placeholder="e.g., Final Project: Building a Web Application"
                                value={title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.labelGroup}>
                                <label className={styles.label}>Assignment Type *</label>
                                <label className={styles.label}>Points *</label>
                            </div>
                            <div className={styles.inputGroup}>
                                <select
                                    value={type}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
                                    className={styles.select}
                                >
                                    <option value="">Select type</option>
                                    <option value="quiz">Quiz</option>
                                    <option value="project">Project</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="e.g., 100"
                                    value={points}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPoints(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Due Date *</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Instructions *</label>
                            <textarea
                                placeholder="Provide detailed instructions for the assignment..."
                                value={instructions}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInstructions(e.target.value)}
                                className={styles.textarea}
                            />
                        </div>
                    </div>
                    <div className={styles.attachmentsSection}>
                        <label className={styles.label}>Attachments</label>
                        <div className={styles.dropZone}>
                            <Paperclip size={24} />
                            <p>Drag and drop files here or click to browse</p>
                            <p className={styles.hint}>Supported formats: PDF, DOC, DOCX, PPT, PPTX, 10MB max</p>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                style={{ display: 'block', marginTop: 10 }}
                            />
                        </div>
                    </div>
                    <div className={styles.settingsSection}>
                        <h3 className={styles.subTitle}>Assignment Settings</h3>
                        <div className={styles.checkboxGrid}>
                            <div className={styles.checkboxGroup}>
                                <input type="checkbox" className={styles.checkbox} id="lateSubmissions" />
                                <label htmlFor="lateSubmissions" className={styles.checkboxLabel}>
                                    Allow late submissions
                                </label>
                            </div>
                            <div className={styles.checkboxGroup}>
                                <input type="checkbox" className={styles.checkbox} id="showPoints" />
                                <label htmlFor="showPoints" className={styles.checkboxLabel}>
                                    Show points to students
                                </label>
                            </div>
                            <div className={styles.checkboxGroup}>
                                <input type="checkbox" className={styles.checkbox} id="requireSubmission" />
                                <label htmlFor="requireSubmission" className={styles.checkboxLabel}>
                                    Require submission
                                </label>
                            </div>
                            <div className={styles.checkboxGroup}>
                                <input type="checkbox" className={styles.checkbox} id="notifyStudents" />
                                <label htmlFor="notifyStudents" className={styles.checkboxLabel}>
                                    Notify students
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.publishSection}>
                        <div className={styles.publishInfo}>
                            <h3 className={styles.infoTitle}>Publishing Options</h3>
                            <ul className={styles.publishList}>
                                <li className={styles.publishItem}>Publish: Assignment becomes immediately available to students</li>
                                <li className={styles.publishItem}>Save Draft: Save your work and publish later</li>
                                <li className={styles.publishItem}>Students will receive notifications when you publish the assignment</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonGroup}>
                    <div>
                        <button
                            className={styles.cancelButton}
                            onClick={() => navigate(`/class/${classId}`)}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button className={styles.draftButton} type="button">
                            Save Draft
                        </button>
                    </div>
                    <button className={styles.publishButton} onClick={handleSubmit} type="button">
                        Publish Assignment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignment;
