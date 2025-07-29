export interface IClassData {
    className: string;
    classId: string;
    classDetails: string;
    onTabChange: (tabName: string) => void;
}
export interface IAssignmentData {
    type: string;
    title: string;
    description: string;
    dueDate: string;
    points: number;
    status: 'Not Submitted' | 'Submitted' | 'Graded';
    submissionDate?: string;
    grade?: number;
}
export interface IMaterial {
    id: number
    title: string
    type: "video" | "document" | "presentation"
    size: string
    uploadDate: string
    uploadedBy: string
    downloads: number
    category: string
    description: string
}
