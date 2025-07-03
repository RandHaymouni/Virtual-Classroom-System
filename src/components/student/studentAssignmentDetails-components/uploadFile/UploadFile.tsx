import { LuUpload } from "react-icons/lu";
import classes from './uploadFile.module.css';
import { TbFileSearch } from "react-icons/tb";
import { useRef, useState, type ChangeEvent, type MouseEvent } from "react";

const UploadFile = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<Array<string> | null>(null);

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            ;
            const filesNames = Array.from(files).map(file => file.name);
            setSelectedFiles(prevSelection => {
                if (prevSelection) {
                    const distinctFiles = filesNames.filter(newFile =>
                        !prevSelection.includes(newFile)
                    );
                    return [...prevSelection, ...distinctFiles];
                }
                else return filesNames;
            });
            console.log('Selected files:', selectedFiles);
            event.target.value = '';
        } else {
            setSelectedFiles(null);
        }
    };

    const removeFile = (index: number) => {
        if (selectedFiles) {
            const updatedFiles = [...selectedFiles];
            updatedFiles.splice(index, 1);
            setSelectedFiles(updatedFiles.length > 0 ? updatedFiles : null);
        }
    }

    //  ensure size + activate drag and drop functionality
    return (
        <div className={classes.uploadFileContainer}>
            <LuUpload className={classes.uploadIcon} /><h5 className={classes.uploadStatement}> Upload your files </h5>
            <h6 >Drag and drop your files here or click to browse</h6>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".pdf,.docx,.zip,.jpg"
                multiple
            />
            <button className={classes.uploadBtn} onClick={handleButtonClick}><TbFileSearch /> Choose Files</button>
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
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            </div>}
        </div>
    )
}

export default UploadFile
