export interface IAssignmentHeader{
    assignmentStatus: "Submitted" | "Not Submitted" | "Graded";
    title: string;
    points: number;
    dueDate: string;
    description: string;
    onBackClick: () => void;
}