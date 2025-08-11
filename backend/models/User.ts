import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string; 
    role: 'student' | 'teacher';
    firstName: string;
    lastName: string;
    studentID?: string;
    academicYear?: string;
    university?: string;
    subjectArea?: string;
    phoneNumber?: string;
    agreeToTerms: boolean;
    parentalConsent?: boolean;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    studentID: {
        type: String,
    },
    academicYear: {
        type: String,
        required: function (this: IUser) { return this.role === 'student'; }
    },
    university: {
        type: String,
        required: function (this: IUser) { return this.role === 'teacher'; }
    },
    subjectArea: {
        type: String,
        required: function (this: IUser) { return this.role === 'teacher'; }
    },
    phoneNumber: {
        type: String
    },
    agreeToTerms: { type: Boolean, required: true },
    parentalConsent: { type: Boolean },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
