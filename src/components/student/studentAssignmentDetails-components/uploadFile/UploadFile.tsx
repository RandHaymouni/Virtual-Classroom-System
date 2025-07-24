import { Upload } from "lucide-react";
import { FileSearch } from "lucide-react";
import classes from './uploadFile.module.css';
import { useUploadFile } from "./uploadFiles.hook.ts";


const UploadFile = () => {
    const { cancelSub, fileInputRef, selectedFiles, isUploaded, handleButtonClick, handleFileChange, removeFile, handleDragOver, handleDragEnter, handleDragLeave, handleDrop } = useUploadFile();

    return {
        cancelSub,
        isUploaded,
        uploadFileComponent:
            (<div className={classes.uploadFileContainer}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <Upload className={classes.uploadIcon} /><h5 className={classes.uploadStatement}> Upload your files </h5>
                <h6 >Drag and drop your files here or click to browse</h6>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept=".pdf,.docx,.zip,.jpg"
                    multiple
                />
                <button className={classes.uploadBtn} onClick={handleButtonClick}><FileSearch /> <span>Choose Files</span></button>
                <h6 className={classes.formats}>Supported formats: PDF, DOCX, ZIP, JPG (Max 10MB)</h6>

                {selectedFiles != null && <div className={classes.selectedFile}>
                    <h6>Selected Files:</h6>
                    <ul>
                        {selectedFiles.map((fileName, index) => (
                            <li key={index} className={classes.fileItem}>
                                <h3 className={classes.fileName}>{fileName}</h3>
                                <button
                                    onClick={() => removeFile(index)}
                                    className={classes.removeBtn}
                                    type="button"
                                >
                                    <h6 className={classes.x}>X</h6>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>}
            </div>)
    }

}

export default UploadFile
