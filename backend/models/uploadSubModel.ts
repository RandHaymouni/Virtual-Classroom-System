import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
    assignmentId: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    fileId: mongoose.Types.ObjectId;
    filename: string;
    uploadDate: Date;
}

const SubmissionSchema = new Schema<ISubmission>({
    assignmentId: { type: Schema.Types.ObjectId, required: true, ref: "Assignment" },
    studentId: { type: Schema.Types.ObjectId, required: true, ref: "Student" },
    fileId: { type: Schema.Types.ObjectId, required: true },
    filename: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now }
});

export default mongoose.model<ISubmission>("Submission", SubmissionSchema);
