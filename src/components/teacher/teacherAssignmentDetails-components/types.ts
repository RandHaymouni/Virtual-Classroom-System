export interface IAssignmentHeader {
    title: string;
    description: string;
    points: string;
    dueDate: string;
}
export interface ISummary {
    title: string;
    count: number;
    total?: number;
    dueDate?: string;
}