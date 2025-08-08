import { Request, Response } from "express";
import express from "express";
import Assignment from "../models/Submission";

const router = express.Router();
router.get("/teacherAssignmentDetails/:id", async (req: Request, res: Response) => {
    try {
        const assignmentId = req.params.id;
        const assignment = await Assignment.findById(assignmentId)
            .populate("submissions.studentId", "name") 
            .lean();
        
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        const response = {
            name: assignment.name,
            type: assignment.type,
            points: assignment.points,
            description: assignment.description,
            submissions: assignment.submissions.map(sub => ({
                studentName: (sub.studentId as any).name,
                submissionDate: sub.submissionDate,
                status: sub.status,
                
            }))
        };

        res.json(response);
    } catch (error) {
        console.error("Error fetching assignment details:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
