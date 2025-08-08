interface ISubmission {
    studentId: number;
    submissionDate: Date;
    status: "Submitted" | "Graded" | "Not Submitted";
}
export interface IAssignment {
    name: string;
    type: string;
    dueDate: string;
    points: number;
    description: string;
    submissions: ISubmission[];
}
export const defaultAssignment: IAssignment = {
    name: "",
    type: "",
    dueDate: "",
    points: 0,
    description: "",
    submissions: []
};
