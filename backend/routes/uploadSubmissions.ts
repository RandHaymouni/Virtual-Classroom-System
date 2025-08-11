import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import multer from "multer";
import { GridFSBucket } from "mongodb";
import Submission from "../models/uploadSubModel.ts";
import authStudent from "../middleware/authMiddleware.ts";

const router = Router();
let bucket: GridFSBucket;
mongoose.connection.once('open', () => {
    if (!mongoose.connection.db) {
        throw new Error("Database connection is not established.");
    }
    bucket = new GridFSBucket(mongoose.connection.db!, {
        bucketName: 'submissions'
    });
});

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 
    }
});



router.post("http://localhost:5173/studentAssignmentDetails/:assignmentId/submissions", authStudent, upload.array("files"), async (req: Request, res: Response) => {
    try {
        const { assignmentId } = req.params;
        const user = (req as any).user;

        if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const files = req.files as Express.Multer.File[];
        const submissions = [];

        for (const file of files) {
            const filename = `${Date.now()}-${file.originalname}`;
            const uploadStream = bucket.openUploadStream(filename, {
                metadata: {
                    assignmentId,
                    studentId: user._id,
                    originalName: file.originalname
                }
            });

            uploadStream.end(file.buffer);

            await new Promise((resolve, reject) => {
                uploadStream.on('finish', resolve);
                uploadStream.on('error', reject);
            });

            const submission = new Submission({
                assignmentId,
                studentId: user._id,
                fileId: uploadStream.id,
                filename: filename,
                originalName: file.originalname,
                fileSize: file.size,
                uploadDate: new Date(),
                status: 'submitted'
            });

            await submission.save();
        }

        res.status(201).json({
            message: "Files uploaded successfully",
            submissions: submissions
        });

    } catch (err) {
        console.error("Error uploading files:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;
