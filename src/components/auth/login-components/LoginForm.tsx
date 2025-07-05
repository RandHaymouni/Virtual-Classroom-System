import type React from "react"
import { useState } from "react"
import { GraduationCap } from "lucide-react"
import styles from "./loginForm.module.css"

const LoginForm = () => {
  const [accountType, setAccountType] = useState("student")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>Sign in to your virtual classroom</p>
        </div>

        {/* Account Type Toggle */}
        <div className={styles.accountTypeToggle}>
          <button
            type="button"
            onClick={() => setAccountType("student")}
            className={`${styles.toggleButton} ${accountType === "student" ? styles.active : ""}`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setAccountType("teacher")}
            className={`${styles.toggleButton} ${accountType === "teacher" ? styles.active : ""}`}
          >
            Teacher
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Email */}
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={styles.input}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <div className={styles.passwordField}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={styles.passwordInput}
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Options */}
          <div className={styles.formOptions}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                Remember me
              </label>
            </div>
            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Log in as {accountType === "student" ? "Student" : "Teacher"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className={styles.signUpSection}>
          <p className={styles.signUpText}>
            Don't have an account?{" "}
            <a href="/signUp" className={styles.link}>
              Sign up here
            </a>
          </p>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerText}>Or continue with</span>
        </div>

        {/* Social Login Buttons */}
        <div className={styles.socialButtons}>
          <button type="button" className={styles.socialButton}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button type="button" className={styles.socialButton}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm