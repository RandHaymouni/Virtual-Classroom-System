import { Schema, model, Document, Types } from "mongoose";

interface ISubmission {
    studentId: Types.ObjectId;
    submissionDate: Date;
    status: "Submitted" | "Graded" | "Not Submitted";
}

export interface IAssignment extends Document {
    name: string;
    type: string;
    dueDate: string;
    points: number;
    description: string;
    submissions: ISubmission[];
}

const submissionSchema = new Schema<ISubmission>({
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    submissionDate: { type: Date },
    status: { type: String, enum: ["Submitted", "Graded", "Not Submitted"], default: "Not Submitted" },
});

const assignmentSchema = new Schema<IAssignment>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    dueDate: { type: String, required: true },
    points: { type: Number, required: true },
    description: { type: String },
    submissions: [submissionSchema]
});

export default model<IAssignment>("Assignment", assignmentSchema);
