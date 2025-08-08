export interface IAssignmentHeader {
    type: string
    title: string;
    description: string;
    points: string;
    dueDate: string;
}
export interface ISummary {
    title: string;
    count?: number;
    total?: number;
    dueDate?: string;
}

export interface IStudentSubmission {
    id: string;
    studentName: string;
    submissionDate: string | null;
    status: 'Submitted' | 'Not Submitted' | 'Graded';
}