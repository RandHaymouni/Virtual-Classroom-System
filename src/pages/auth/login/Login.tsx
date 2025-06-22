import LoginForm from '../../../components/auth/login-components/LoginForm'
import styles from "./login.module.css"

const Login = () => {
  return (
    <>
      <LoginForm />
      <div className={styles.footer}>
        <p className={styles.footerText}>
          By signing in, you agree to our{" "}
          <a href="#" className={styles.link}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className={styles.link}>
            Privacy Policy
          </a>
        </p>
      </div>
    </>
  )
}

export default Login