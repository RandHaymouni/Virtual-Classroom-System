import { Router, Request, Response } from 'express';
import { verifyJWT, requireRole, AuthenticatedRequest } from '../middleware/authMiddleware';
import AssignmentModel from '../models/Assignment';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

const router = Router();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/virtual-classroom';

if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoURI).catch(err => {
        console.error('MongoDB connection error:', err);
    });
}

let gfs: GridFSBucket | null = null;

mongoose.connection.once('open', () => {
    if (!mongoose.connection.db) {
        console.error('MongoDB connection.db is undefined!');
        return;
    }
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'attachments',
    });
    console.log('✅ GridFSBucket ready');
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    '/',
    verifyJWT,
    requireRole(['teacher']),
    upload.array('attachments'),
    async (req: AuthenticatedRequest, res: Response) => {
        try {
            if (!gfs) {
                return res.status(500).json({ success: false, message: 'Storage not initialized yet' });
            }

            const teacherId = req.user!.id;
            const {
                title,
                assignmentType,
                points,
                dueDate,
                instructions,
                class: classId,
                settings,
            } = req.body;

            if (!title || !assignmentType || !points || !dueDate || !instructions || !classId) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            let attachments: { filename: string; url: string; mimeType: string }[] = [];

            if (req.files && Array.isArray(req.files)) {
                for (const file of req.files as Express.Multer.File[]) {
                    const filename = crypto.randomBytes(16).toString('hex') + path.extname(file.originalname);

                    await new Promise<void>((resolve, reject) => {
                        const uploadStream = gfs!.openUploadStream(filename, {
                            contentType: file.mimetype,
                        });

                        uploadStream.on('error', (err) => reject(err));
                        uploadStream.on('finish', () => resolve());

                        uploadStream.end(file.buffer);
                    });

                    attachments.push({
                        filename,
                        url: `/api/assignments/files/${filename}`,
                        mimeType: file.mimetype,
                    });
                }
            }

            let parsedSettings = {};
            if (settings) {
                try {
                    parsedSettings = typeof settings === 'string' ? JSON.parse(settings) : settings;
                } catch (e) {
                    return res.status(400).json({ success: false, message: 'Invalid settings JSON' });
                }
            }

            const newAssignment = new AssignmentModel({
                title,
                assignmentType,
                points: Number(points),
                dueDate: new Date(dueDate),
                instructions,
                class: classId,
                teacher: teacherId,
                attachments,
                settings: parsedSettings,
            });

            await newAssignment.save();

            res.status(201).json({ success: true, data: newAssignment });
        } catch (error) {
            console.error('Error creating assignment:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
);

router.get('/files/:filename', (req: Request, res: Response) => {
    if (!gfs) {
        return res.status(500).json({ success: false, message: 'Storage not initialized yet' });
    }

    const downloadStream = gfs!.openDownloadStreamByName(req.params.filename);

    downloadStream.on('error', (error: Error) => {
        res.status(404).json({ success: false, message: 'File not found' });
    });

    downloadStream.pipe(res);
});

export default router;
