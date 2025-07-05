import type React from "react"
import { useState } from "react"
import { GraduationCap } from "lucide-react"
import styles from "./signUpForm.module.css"

const SignUpForm = () => {
  const [accountType, setAccountType] = useState("student");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    gradeLevel: "",
    university: "",
    subjectArea: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    parentalConsent: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <GraduationCap />
            </div>
            <h1 className={styles.logoText}>EduClass</h1>
          </div>
          <h2 className={styles.title}>Create your account</h2>
          <p className={styles.subtitle}>Join thousands of educators and students</p>
        </div>

        {/* Account Type Toggle */}
        <div className={styles.accountTypeToggle}>
          <button
            type="button"
            onClick={() => setAccountType("student")}
            className={`${styles.toggleButton} ${accountType === "student" ? styles.active : ""}`}
          >
            I'm a Student
          </button>
          <button
            type="button"
            onClick={() => setAccountType("teacher")}
            className={`${styles.toggleButton} ${accountType === "teacher" ? styles.active : ""}`}
          >
            I'm a Teacher
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.nameFields}>
            <div className={styles.fieldGroup}>
              <label htmlFor="firstName" className={styles.label}>
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                className={styles.input}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="lastName" className={styles.label}>
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className={styles.input}
              />
            </div>
          </div>

          {/* Email */}
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={styles.input}
            />
          </div>

          {accountType === "student" && (
            <>
              {/* Student-specific fields */}
              <div className={styles.fieldGroup}>
                <label htmlFor="studentId" className={styles.label}>Student ID (optional)</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="e.g. 201123"
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="gradeLevel" className={styles.label}>Academic Year</label>
                <select
                  id="gradeLevel"
                  name="gradeLevel"
                  value={formData.gradeLevel}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">Select your academic year</option>
                  <option value="college-1">First Year</option>
                  <option value="college-2">Second Year</option>
                  <option value="college-3">Third Year</option>
                  <option value="college-4">Fourth Year</option>
                  <option value="college-5">Fifth Year</option>
                </select>
              </div>
            </>
          )}

          {accountType === "teacher" && (
            <>
              {/* Teacher-specific fields */}
              <div className={styles.fieldGroup}>
                <label htmlFor="university" className={styles.label}>University</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  placeholder="e.g. PPU"
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="subjectArea" className={styles.label}>Subject Area</label>
                <select
                  id="subjectArea"
                  name="subjectArea"
                  value={formData.subjectArea}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">Select your subject area</option>
                  <option value="math">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                  <option value="art">Art</option>
                  <option value="computer">Computer Science</option>
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="phone" className={styles.label}>Phone Number (optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="05********"
                  className={styles.input}
                />
              </div>
            </>
          )}

          {/* Password */}
          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordField}>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                className={styles.passwordInput}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className={styles.fieldGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm password
            </label>
            <div className={styles.passwordField}>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={styles.passwordInput}
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className={styles.checkbox}
            />
            <label htmlFor="agreeToTerms" className={styles.checkboxLabel}>
              I agree to the{" "}
              <a href="#" className={styles.link}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className={styles.link}>
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            {accountType === "student" ? "Create Student Account" : "Create Teacher Account"}
          </button>
        </form>

        {/* Log In Link */}
        <div className={styles.loginSection}>
          <p className={styles.loginText}>
            Already have an account?{" "}
            <a href="/login" className={styles.link}>
              Log In here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
