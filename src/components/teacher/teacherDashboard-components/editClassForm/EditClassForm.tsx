import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom" 
import dialogStyles from "./editClassForm.module.css"

interface EditClassFormProps {
  isOpen: boolean
  onClose: () => void
  classData: {
    id: string   
    title: string
    code: string
    description?: string
    color: string
  }
  onSave: (id: string, updatedData: Omit<EditClassFormProps['classData'], 'id'>) => void;
}


const EditClassForm = ({ isOpen, onClose, classData, onSave }: EditClassFormProps) => {
  const [editTitle, setEditTitle] = useState(classData.title)
  const [editCode, setEditCode] = useState(classData.code)
  const [editDescription, setEditDescription] = useState(classData.description)
  const [editColor, setEditColor] = useState(classData.color)

  const dialogRef = useRef<HTMLDivElement>(null)

  // Reset form fields when dialog opens/changes classData
  useEffect(() => {
    if (isOpen) {
      setEditTitle(classData.title)
      setEditCode(classData.code)
      setEditDescription(classData.description)
      setEditColor(classData.color)
    }
  }, [isOpen, classData])

  // Close dialog when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutsideDialog = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutsideDialog)
      document.addEventListener("keydown", handleEscapeKey)
    } else {
      document.removeEventListener("mousedown", handleClickOutsideDialog)
      document.removeEventListener("keydown", handleEscapeKey)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDialog)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen, onClose])

  const handleSave = () => {
    onSave(classData.id, {
      title: editTitle,
      code: editCode,
      description: editDescription,
      color: editColor,
    })
    onClose()
  }

  if (!isOpen) return null

  // Render the dialog using createPortal to the document body
  return createPortal(
    <div className={dialogStyles.dialogOverlay}>
      <div ref={dialogRef} className={dialogStyles.dialogContent}>
        <div className={dialogStyles.dialogHeader}>
          <h3 className={dialogStyles.dialogTitle}>Edit Class</h3>
          <button
            onClick={onClose}
            className={dialogStyles.dialogCloseButton}
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>
        <p className={dialogStyles.dialogDescription}>
          Make changes to the class here. Click save when you're done.
        </p>
        <div className={dialogStyles.formGrid}>
          <div className={dialogStyles.formRow}>
            <label htmlFor="title" className={dialogStyles.formLabel}>
              Title
            </label>
            <input
              id="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={dialogStyles.formInput}
            />
          </div>
          <div className={dialogStyles.formRow}>
            <label htmlFor="code" className={dialogStyles.formLabel}>
              Code
            </label>
            <input
              id="code"
              value={editCode}
              onChange={(e) => setEditCode(e.target.value)}
              className={dialogStyles.formInput}
            />
          </div>
          <div className={dialogStyles.formRow}>
            <label htmlFor="description" className={dialogStyles.formLabel}>
              Description
            </label>
            <textarea
              id="description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className={dialogStyles.formInput}
              rows={4}
            />
          </div>
          <div className={dialogStyles.formRow}>
            <label htmlFor="color" className={dialogStyles.formLabel}>
              Color
            </label>
            <select
              id="color"
              value={editColor}
              onChange={(e) => setEditColor(e.target.value)}
              className={dialogStyles.formSelect}
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
            </select>
          </div>
        </div>
        <div className={dialogStyles.dialogFooter}>
          <button
            type="button"
            onClick={handleSave}
            className={dialogStyles.saveButton}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default EditClassForm
