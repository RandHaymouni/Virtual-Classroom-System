export interface IAssignmentData {
  id: string
  title: string
  type: string
  points: number
  dueDate: string
  status: "Submitted" | "Not Submitted" | "Graded"
  submissionDate?: string
  grade?: number
}

export interface IClassData {
  className: string
  classDetails: string
  onTabChange: (tabName: string) => void
}

export interface IMaterialData {
  id: string
  title: string
  type: "video" | "presentation" | "document"
  category: string
  size: string
  uploadDate: string
  uploadedBy: string
  downloads: number
  description?: string
  url?: string
}
