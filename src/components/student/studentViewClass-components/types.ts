export interface IClassData {
    className: string;
    classId: string;
    classDetails: string;
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
