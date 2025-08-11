import express, { Request, Response } from 'express';
import Class from '../models/Class';
import { verifyJWT } from '../middleware/authMiddleware';
import mongoose from 'mongoose';
import { AuthenticatedRequest, requireRole } from '../middleware/authMiddleware';
const router = express.Router();

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
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

    const savedClass = await newClass.save();

    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      data: savedClass
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create class',
      error: getErrorMessage(error)
    });
  }
});



export default router;




// import express, { Request, Response } from 'express';
// import Class from '../models/Class';
// import { Types } from 'mongoose';
// import { verifyJWT, requireRole } from '../middleware/authMiddleware';

// const router = express.Router();

// const getErrorMessage = (error: unknown): string => {
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return String(error);
// };

// // Get all classes (any logged-in user)
// router.get('/', verifyJWT, async (req: Request, res: Response) => {
//   try {
//     const classes = await Class.find()
//       .populate('teacher', 'name email')
//       .populate('students', 'name email')
//       .sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       message: 'Classes retrieved successfully',
//       count: classes.length,
//       data: classes
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve classes',
//       error: getErrorMessage(error)
//     });
//   }
// });

// // Get single class
// router.get('/:id', verifyJWT, async (req: Request, res: Response) => {
//   try {
//     const classData = await Class.findById(req.params.id)
//       .populate('teacher', 'name email')
//       .populate('students', 'name email');
//     if (!classData) {
//       return res.status(404).json({
//         success: false,
//         message: 'Class not found'
//       });
//     }
//     res.json({
//       success: true,
//       message: 'Class retrieved successfully',
//       data: classData
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve class',
//       error: getErrorMessage(error)
//     });
//   }
// });

// // Create class (teachers only)
// router.post('/', verifyJWT, requireRole(['teacher']), async (req: Request, res: Response) => {
//   try {
//     const { title, code, term, description, enrollmentKey, settings } = req.body;
//     if (!title || !code || !term || !enrollmentKey) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: title, code, term, enrollmentKey'
//       });
//     }

//     const existingClass = await Class.findOne({ code: code.toUpperCase() });
//     if (existingClass) {
//       return res.status(400).json({
//         success: false,
//         message: 'Class code already exists'
//       });
//     }

//     const existingKey = await Class.findOne({ enrollmentKey: enrollmentKey.toUpperCase() });
//     if (existingKey) {
//       return res.status(400).json({
//         success: false,
//         message: 'Enrollment key already exists'
//       });
//     }

//     const newClass = new Class({
//       title,
//       code: code.toUpperCase(),
//       term,
//       description,
//       enrollmentKey: enrollmentKey.toUpperCase(),
//       teacher: new Types.ObjectId(req.user?.id),
//       settings: {
//         allowComments: settings?.allowComments || false,
//         showGrades: settings?.showGrades !== false,
//         allowLateSubmissions: settings?.allowLateSubmissions || false,
//         sendNotifications: settings?.sendNotifications !== false
//       }
//     });

//     const savedClass = await newClass.save();
//     res.status(201).json({
//       success: true,
//       message: 'Class created successfully',
//       data: savedClass
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create class',
//       error: getErrorMessage(error)
//     });
//   }
// });

// // Update class (teachers only)
// router.put('/:id', verifyJWT, requireRole(['teacher']), async (req: Request, res: Response) => {
//   try {
//     const { title, description, settings } = req.body;
//     const updatedClass = await Class.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...(title && { title }),
//         ...(description !== undefined && { description }),
//         ...(settings && { settings: { ...settings } })
//       },
//       { new: true, runValidators: true }
//     ).populate('teacher', 'name email').populate('students', 'name email');

//     if (!updatedClass) {
//       return res.status(404).json({
//         success: false,
//         message: 'Class not found'
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Class updated successfully',
//       data: updatedClass
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update class',
//       error: getErrorMessage(error)
//     });
//   }
// });

// // Delete class (teachers only)
// router.delete('/:id', verifyJWT, requireRole(['teacher']), async (req: Request, res: Response) => {
//   try {
//     const deletedClass = await Class.findByIdAndDelete(req.params.id);
//     if (!deletedClass) {
//       return res.status(404).json({
//         success: false,
//         message: 'Class not found'
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Class deleted successfully',
//       data: { id: req.params.id, title: deletedClass.title }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete class',
//       error: getErrorMessage(error)
//     });
//   }
// });

// // Join class (any logged-in user)
// router.post('/join', verifyJWT, async (req: Request, res: Response) => {
//   try {
//     const { enrollmentKey } = req.body;
//     if (!enrollmentKey) {
//       return res.status(400).json({
//         success: false,
//         message: 'Enrollment key is required'
//       });
//     }

//     const classData = await Class.findOne({ enrollmentKey: enrollmentKey.toUpperCase() });
//     if (!classData) {
//       return res.status(404).json({
//         success: false,
//         message: 'Invalid enrollment key'
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Class found successfully',
//       data: {
//         id: classData._id,
//         title: classData.title,
//         code: classData.code,
//         description: classData.description
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to join class',
//       error: getErrorMessage(error)
//     });
//   }
// });

// export default router;
