import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAssignment extends Document {
    title: string;
    assignmentType: 'project' | 'quiz' | 'assignment' | 'exam';
    points: number;
    dueDate: Date;
    instructions: string;
    class: Types.ObjectId;
    teacher: Types.ObjectId;
    attachments?: {
        filename: string;
        url: string;
        mimeType: string;
    }[];
    settings?: {
        allowLateSubmissions?: boolean;
        requireSubmission?: boolean;
        showPoints?: boolean;
        notifyStudents?: boolean;
    };
}

const AttachmentSchema = new Schema({
    filename: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
});

const AssignmentSchema = new Schema<IAssignment>({
    title: { type: String, required: true, trim: true },
    assignmentType: {
        type: String,
        enum: ['project', 'quiz', 'assignment', 'exam'],
        required: true
    },
    points: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    instructions: { type: String, required: true },
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    attachments: [AttachmentSchema],
    settings: {
        allowLateSubmissions: { type: Boolean, default: false },
        requireSubmission: { type: Boolean, default: false },
        showPoints: { type: Boolean, default: true },
        notifyStudents: { type: Boolean, default: true },
    },
}, {
    timestamps: true,
});

export default mongoose.model<IAssignment>('Assignment', AssignmentSchema);
