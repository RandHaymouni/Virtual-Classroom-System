import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IClass extends Document {
  title: string;
  code: string;
  term: string;
  description?: string;
  enrollmentKey: string;
  teacher: mongoose.Types.ObjectId;
  students: mongoose.Types.ObjectId[];
  color: { type: String, default: '#FFFFFF' },
  settings: {
    allowComments: boolean;
    showGrades: boolean;
    allowLateSubmissions: boolean;
    sendNotifications: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const ClassSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Class title is required'],
    trim: true,
    maxlength: [100, 'Class title cannot exceed 100 characters']
  },

  code: {
    type: String,
    required: [true, 'Class code is required'],
    unique: true,
    trim: true,
    uppercase: true,
    maxlength: [20, 'Class code cannot exceed 20 characters'],
    index: true
  },

  term: {
    type: String,
    required: [true, 'Term is required'],
    enum: ['fall-2024', 'spring-2024', 'summer-2024', 'spring-2025', 'fall-2025', 'summer-2025', 'fall-2023', 'spring-2023', 'summer-2023', 'fall-2022', 'spring-2022', 'summer-2022']
  },

  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },

  enrollmentKey: {
    type: String,
    required: [true, 'Enrollment key is required'],
    unique: true,
    trim: true,
    minlength: [6, 'Enrollment key must be at least 6 characters'],
    select: false
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Teacher is required']
  },

  students: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    validate: {
      validator: function (v: Types.ObjectId[]) {
        return v.length <= 200;
      },
      message: 'Too many students in one class'
    }
  },
  color: {
    type: String,
    default: 'blue',
    trim: true,
    enum: ['blue', 'green', 'purple', 'orange', 'pink', 'yellow', 'black']
  },

  settings: {
    allowComments: { type: Boolean, default: false },
    showGrades: { type: Boolean, default: true },
    allowLateSubmissions: { type: Boolean, default: false },
    sendNotifications: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

export default mongoose.model<IClass>('Class', ClassSchema);