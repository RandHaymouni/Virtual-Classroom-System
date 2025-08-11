"use client"

import { useState } from "react"
import styles from "./commentSection.module.css"

export default function CommentSection() {
  const [comments, setComments] = useState("")

  return (
    <div className={styles.commentSection}>
      <h3 className={styles.title}>Comments (optional)</h3>
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Add any comments about your submission..."
        className={styles.textarea}
      />
    </div>
  )
}
