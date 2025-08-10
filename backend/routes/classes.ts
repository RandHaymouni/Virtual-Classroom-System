import { Router, Request, Response } from "express";
import Class from "../models/Class.ts";
import { authTeacher } from "../middleware/authMiddleware.ts";

const router = Router();

router.post("/createClass", authTeacher, async (req: Request, res: Response) => {
    try {
        const { title, classCode, term, description, enrollmentKey, settings } = req.body;
        const user = (req as any).user;
        const existingClassCode = await Class.findOne({ classCode });
        if (existingClassCode) {
            return res.status(400).json({ message: "Class code already exists." });
        }

        const existingEnrollmentKey = await Class.findOne({ enrollmentKey });
        if (existingEnrollmentKey) {
            return res.status(400).json({ message: "Enrollment key already exists." });
        }

        const newClass = new Class({
            title,
            classCode,
            term,
            description,
            enrollmentKey,
            teacherId: user!._id,
            settings: {
                allowComments: settings.allowComments,
                showGrades: settings.showGrades,
                allowLateSubmissions: settings.allowLateSubmissions,
                sendNotifications: settings.sendNotifications,
            }
        });

        await newClass.save();

        res.status(201).json(newClass);
    } catch (error) {
        console.error("Error creating class:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
