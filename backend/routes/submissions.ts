// routes/submissionRoutes.ts
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Submission from "../models/Submission";
import { upload } from "../config/gridfs";
import { AuthenticatedRequest, verifyJWT, requireRole } from "../middleware/authMiddleware";

const router = express.Router();

// Upload files and create submission
router.post(
  "/",
  verifyJWT,
  requireRole(["user"]),
  upload.array("files"),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { assignmentId, comments } = req.body;

      if (!req.files || (req.files as any[]).length === 0) {
        return res
          .status(400)
          .json({ message: "Please upload at least one file." });
      }

      const filesData = (req.files as any[]).map((file) => ({
        fileId: file.id,
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype,
      }));

      const submission = await Submission.create({
        student: req.user?.id,
        assignment: assignmentId,
        comments,
        files: filesData,
      });

      res.status(201).json(submission);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  }
);

// Download file from submission
router.get("/:id/file", verifyJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findById(id)
      .populate("student")
      .populate({
        path: "assignment",
        populate: { path: "teacher" },
      })
      .exec();

    if (!submission) {
      return res.status(404).json({ message: "Submission not found." });
    }

    // Permission check
    if (
      req.user?.role === "student" &&
      submission.student._id.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (
      req.user?.role === "teacher" &&
      (submission.assignment as any).teacher._id.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({ message: "Access denied." });
    }

    if (!submission.files.length) {
      return res.status(404).json({ message: "No files found in this submission." });
    }

    const fileId = submission.files[0].fileId;

    if (!mongoose.connection.db) {
      return res.status(500).json({ message: "Database not connected." });
    }

    const bucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db as mongoose.mongo.Db,
      { bucketName: "uploads" }
    );

    const files = await bucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "File not found." });
    }

    const file = files[0];
    res.setHeader(
      "Content-Type",
      file.contentType || "application/octet-stream"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.filename}"`
    );

    bucket.openDownloadStream(file._id).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
