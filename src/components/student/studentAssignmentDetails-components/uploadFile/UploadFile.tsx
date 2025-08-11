"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Paperclip, Upload, FileSearch, Download } from "lucide-react"
import styles from "./uploadFile.module.css"

export default function UploadFile() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Paperclip size={18} />
          Attachments
        </h2>
      </div>

      <div className={styles.content}>
        {/* Existing attachments */}
        <div className={styles.existingFiles}>
          <div className={styles.fileItem}>
            <div className={styles.fileInfo}>
              <div className={styles.fileIcon}></div>
              <div>
                <span className={styles.fileName}>project_rubric.pdf</span>
                <span className={styles.fileSize}>(245 KB)</span>
              </div>
            </div>
            <button className={styles.downloadButton}>
              <Download size={16} />
              Download
            </button>
          </div>

          <div className={styles.fileItem}>
            <div className={styles.fileInfo}>
              <div className={styles.fileIcon}></div>
              <div>
                <span className={styles.fileName}>example_project.zip</span>
                <span className={styles.fileSize}>(1.2 MB)</span>
              </div>
            </div>
            <button className={styles.downloadButton}>
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className={styles.uploadArea} onDrop={handleDrop} onDragOver={handleDragOver}>
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
        />

        <button onClick={() => fileInputRef.current?.click()} className={styles.chooseButton}>
          <FileSearch size={16} />
          Choose Files
        </button>

        <p className={styles.supportedFormats}>Supported formats: PDF, DOC, DOCX, ZIP, JPG, PNG (Max 10MB each)</p>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className={styles.selectedFiles}>
            <h4 className={styles.selectedTitle}>Selected Files:</h4>
            <div className={styles.selectedList}>
              {selectedFiles.map((file, index) => (
                <div key={index} className={styles.selectedItem}>
                  <div className={styles.selectedInfo}>
                    <div className={styles.selectedIcon}></div>
                    <span className={styles.selectedName}>{file.name}</span>
                    <span className={styles.selectedSize}>({formatFileSize(file.size)})</span>
                  </div>
                  <button onClick={() => removeFile(index)} className={styles.removeButton}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
