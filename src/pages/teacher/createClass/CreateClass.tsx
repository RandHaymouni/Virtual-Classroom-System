import CreateClassForm from "../../../components/teacher/createClass-components/CreateClassForm"
import styles from "./createClass.module.css"
const CreateClass = () => {
    return (
        <div className={styles.pageContainer}>
            <CreateClassForm />
        </div>
    )
}

export default CreateClass