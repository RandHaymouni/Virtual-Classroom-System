// models/Submission.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISubmission extends Document {
  student: Types.ObjectId;       // الطالب
  assignment: Types.ObjectId;    // الواجب
  comments?: string;             // تعليق اختياري
  files: {
    fileId: Types.ObjectId;      // ID تبع GridFS
    filename: string;            // اسم الملف
    size: number;                 // حجم الملف
    mimetype: string;            // نوع الملف
  }[];
  submittedAt: Date;              // وقت التسليم
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignment: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true
    },
    comments: {
      type: String,
      trim: true
    },
    files: [
      {
        fileId: { type: Schema.Types.ObjectId, required: true },
        filename: { type: String, required: true },
        size: { type: Number, required: true },
        mimetype: { type: String, required: true }
      }
    ],
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model<ISubmission>("Submission", SubmissionSchema);
