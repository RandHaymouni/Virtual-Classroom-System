import SignUpForm from '../../../components/auth/signUp-components/SignUpForm'
import styles from "./signUp.module.css"

const SignUp = () => {
  return (
    <>
      <SignUpForm />
      <div className={styles.footer}>
        <p className={styles.footerText}>
          By creating an account, you agree to our{" "}
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

export default SignUp