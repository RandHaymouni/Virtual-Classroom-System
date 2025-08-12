import express, { Request, Response } from 'express';
import Class from '../models/Class';
import { verifyJWT } from '../middleware/authMiddleware';
import mongoose from 'mongoose';
import { AuthenticatedRequest, requireRole } from '../middleware/authMiddleware';
import AssignmentModel from '../models/Assignment';

const router = express.Router();

const allowedColors = ['blue', 'green', 'purple', 'orange', 'pink', 'yellow', 'black']
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * allowedColors.length);
  return allowedColors[randomIndex];
}
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

router.get('/', verifyJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    let query = {};

    if (req.user?.role === 'teacher') {
      query = { teacher: req.user?.id };
    } else if (req.user?.role === 'student') {
      query = { students: req.user?.id };
    }

    const classes = await Class.find(query)
      .populate('teacher', 'firstName lastName email')
      .populate('students', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Classes retrieved successfully',
      count: classes.length,
      data: classes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve classes',
      error: getErrorMessage(error)
    });
  }
});

router.get('/:id', verifyJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const classId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ success: false, message: 'Invalid class ID' });
    }

    const classData = await Class.findById(classId)
      .populate('teacher', 'firstName lastName email')
      .populate('students', 'firstName lastName email')

    if (!classData) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    const userId = req.user?.id;
    const isTeacher = classData.teacher && classData.teacher._id.toString() === userId;
    const isStudent = classData.students?.some(
      (student: any) => student._id.toString() === userId
    ) ?? false;

    if (!isTeacher && !isStudent) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({
      success: true,
      data: classData
    });
  } catch (error) {
    console.error('Error fetching class details:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update class details (only accessible by the teacher who owns the class)
router.put('/:id', verifyJWT, requireRole(['teacher']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const authReq = req;
    const { id } = req.params;
    const { title, code, description, color } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid class ID' });
    }

    const updateData: any = {};
    if (title) updateData.title = title;
    if (code) {
      const existingClass = await Class.findOne({ code: code.toUpperCase(), _id: { $ne: id } });
      if (existingClass) {
        return res.status(400).json({ success: false, message: 'Class code already exists' });
      }
      updateData.code = code.toUpperCase();
    }
    if (description !== undefined) updateData.description = description;
    if (color) updateData.color = color;

    const updatedClass = await Class.findOneAndUpdate(
      { _id: id, teacher: authReq.user?.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: 'Class not found or you do not have permission to edit it',
      });
    }

    res.json({
      success: true,
      message: 'Class updated successfully',
      data: updatedClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update class',
      error: getErrorMessage(error),
    });
  }
});

// Delete a class (only the teacher who owns the class can delete it)
router.delete('/:id', verifyJWT, requireRole(['teacher']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid class ID' });
    }

    const deletedClass = await Class.findOneAndDelete({ _id: id, teacher: req.user?.id });

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: 'Class not found or you do not have permission to delete it',
      });
    }

    res.json({
      success: true,
      message: 'Class deleted successfully',
      data: deletedClass,
    });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete class',
      error: getErrorMessage(error),
    });
  }
});

// Create class (teachers only)
router.post('/', verifyJWT, requireRole(['teacher']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, code, term, description, enrollmentKey, settings } = req.body;

    if (!title || !code || !term || !enrollmentKey) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, code, term, enrollmentKey'
      });
    }

    const existingClass = await Class.findOne({ code: code.toUpperCase() });
    if (existingClass) {
      return res.status(400).json({
        success: false,
        message: 'Class code already exists'
      });
    }

    const existingKey = await Class.findOne({ enrollmentKey: enrollmentKey.toUpperCase() });
    if (existingKey) {
      return res.status(400).json({
        success: false,
        message: 'Enrollment key already exists'
      });
    }

    const newClass = new Class({
      title,
      code: code.toUpperCase(),
      term,
      description,
      enrollmentKey: enrollmentKey.toUpperCase(),
      teacher: new mongoose.Types.ObjectId(req.user?.id),
      color: getRandomColor(),
      settings: {
        allowComments: settings?.allowComments || false,
        showGrades: settings?.showGrades !== false,
        allowLateSubmissions: settings?.allowLateSubmissions || false,
        sendNotifications: settings?.sendNotifications !== false
      }
    });

    console.log("Saving class color:", newClass.color);
    const savedClass = await newClass.save();

    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      data: savedClass
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: 'Failed to create class',
      error: getErrorMessage(error)
    });
  }
});

// Join class (any logged-in user)
router.post('/join', verifyJWT, async (req: AuthenticatedRequest, res: Response) => {
  console.log('POST /join called with body:', req.body);
  try {
    const { enrollmentKey, action } = req.body;
    if (!enrollmentKey) {
      return res.status(400).json({
        success: false,
        message: 'Enrollment key is required'
      });
    }

    const classData = await Class.findOne({ enrollmentKey: enrollmentKey.toUpperCase() });
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Invalid enrollment key'
      });
    }
    console.log('Action:', req.body.action);

    if (action === 'find') {
      return res.json({
        success: true,
        message: 'Class found successfully',
        data: {
          id: classData._id,
          title: classData.title,
          code: classData.code,
          description: classData.description,
          color: classData.color
        }
      });
    }

    if (action !== 'join') {
      console.log('Action is not join:', action);
    }

    if (action === 'join') {
      const studentId = req.user?.id;
      if (!studentId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const studentObjectId = new mongoose.Types.ObjectId(studentId);
      console.log('Students before check:', classData.students);
      console.log('Student to add:', studentObjectId);
      if (!classData.students.some(s => s.equals(studentObjectId))) {
        console.log('Student not found in class, adding...');
        classData.students.push(studentObjectId);
        await classData.save();
        console.log('After saving students:', classData.students);
      }
      else {
        console.log('Student already in class');
      }

      return res.json({
        success: true,
        message: 'Joined class successfully',
        data: classData
      });
    }

    res.status(400).json({ success: false, message: 'Invalid action' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to join class',
      error: getErrorMessage(error)
    });
  }
});

router.get(
  '/:id/assignments',
  verifyJWT,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const classId = req.params.id;
      const userId = req.user?.id;

      // تحقق صلاحية ID
      if (!classId || !classId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, message: 'Invalid class ID' });
      }

      // جلب بيانات الكلاس للتحقق من العضوية
      const classData = await Class.findById(classId);

      if (!classData) {
        return res.status(404).json({ success: false, message: 'Class not found' });
      }

      // تحقق إذا المستخدم معلم أو طالب ضمن الكلاس
      const isTeacher = classData.teacher.toString() === userId;
      const isStudent = classData.students.some((studentId: any) => studentId.toString() === userId);

      if (!isTeacher && !isStudent) {
        return res.status(403).json({ success: false, message: 'Access denied: Not a member of this class' });
      }

      // جلب الواجبات الخاصة بالكلاس مع الحقول المطلوبة فقط
      const assignments = await AssignmentModel.find({ class: classId })
        .select('title assignmentType points dueDate instructions settings')
        .sort({ dueDate: 1 });

      res.json({
        success: true,
        data: assignments,
      });
    } catch (error) {
      console.error('Error fetching assignments:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);


export default router;
