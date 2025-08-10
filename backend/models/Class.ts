import { Schema, model, Document, Types } from "mongoose";

interface ISettings {
    allowComments: boolean;
    showGrades: boolean;
    allowLateSubmissions: boolean;
    sendNotifications: boolean;
}

export interface IClass extends Document {
    title: string;
    classCode: string;
    term: string;
    description: string;
    enrollmentKey: string;
    teacherId: Types.ObjectId;
    settings: ISettings;
}

const settingsSchema = new Schema<ISettings>({
    allowComments: { type: Boolean, default: true },
    showGrades: { type: Boolean, default: true },
    allowLateSubmissions: { type: Boolean, default: false },
    sendNotifications: { type: Boolean, default: true },
});

const classSchema = new Schema<IClass>({
    title: { type: String, required: true },
    classCode: { type: String, required: true, unique: true },
    term: { type: String, required: true },
    description: { type: String },
    enrollmentKey: { type: String, required: true, unique: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    settings: { type: settingsSchema, required: true },
}, { timestamps: true });

export default model<IClass>("Class", classSchema);
