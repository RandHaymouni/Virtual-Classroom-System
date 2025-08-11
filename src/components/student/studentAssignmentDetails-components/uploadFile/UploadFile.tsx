import { useRef } from "react";
import { Paperclip, Upload, FileSearch } from "lucide-react";
import styles from "./uploadFile.module.css";

interface UploadFileProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const UploadFile = ({ selectedFiles, setSelectedFiles }: UploadFileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Paperclip size={18} />
          Attachments
        </h2>
      </div>

      <div className={styles.content}>
        {selectedFiles.length === 0 && <p>No files selected yet.</p>}

        {selectedFiles.length > 0 && (
          <div className={styles.selectedFiles}>
            <h4 className={styles.selectedTitle}>Selected Files:</h4>
            <div className={styles.selectedList}>
              {selectedFiles.map((file, index) => (
                <div key={index} className={styles.selectedItem}>
                  <div className={styles.selectedInfo}>
                    <span className={styles.selectedName}>{file.name}</span>
                    <span className={styles.selectedSize}>({formatFileSize(file.size)})</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className={styles.removeButton}
                    type="button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className={styles.uploadArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={48} className={styles.uploadIcon} />
        <h3 className={styles.uploadTitle}>Upload your files</h3>
        <p className={styles.uploadDescription}>Drag and drop files here or click to browse</p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className={styles.hiddenInput}
          accept=".pdf,.doc,.docx,.zip,.jpg,.png"
          multiple
          style={{ display: "none" }}
        />

        <button onClick={() => fileInputRef.current?.click()} className={styles.chooseButton} type="button">
          <FileSearch size={16} />
          Choose Files
        </button>

        <p className={styles.supportedFormats}>
          Supported formats: PDF, DOC, DOCX, ZIP, JPG, PNG (Max 10MB each)
        </p>
      </div>
    </div>
  );
};

export default UploadFile;
