import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function authTeacher(req: Request, res: Response, next: NextFunction) {
  try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      const User = (req as any).user;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. teachers only " });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}
