import { LuUpload } from "react-icons/lu";
import classes from './uploadFile.module.css';
import { TbFileSearch } from "react-icons/tb";
const UploadFile = () => {
    return (
        <div className={classes.uploadFileContainer}>
            <LuUpload className={classes.uploadIcon} /><h5 className={classes.uploadStatement}> Upload your files </h5>
            <h6 >Drag and drop your files here or click to browse</h6>
            <button className={classes.uploadBtn}><TbFileSearch />       Choose Files</button>
            <h6 className={classes.formats}>Supported formats: PDF, DOCX, ZIP, JPG (Max 10MB)</h6>
        </div>
    )
}

export default UploadFile
