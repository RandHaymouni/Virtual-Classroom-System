import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
    name?:string;
    email?:string
  };
}

export const verifyJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1] || req.header("Authorization")?.replace("Bearer ", ""); // ممكن نعدل عليهم

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided'
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: JWT_SECRET not set',
      });
    }

    // Verify token and cast payload with optional id and role
    const decoded = jwt.verify(token, secret) as JwtPayload & {
      id?: string;
      role?: string;
    };

    // Validate payload contains id and role
    if (!decoded || !decoded.id || !decoded.role) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token payload'
      });
    }

    // Cast request to AuthenticatedRequest to assign user
    (req as AuthenticatedRequest).user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;

    // Check if user role is allowed
    if (!authReq.user || !allowedRoles.includes(authReq.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to perform this action'
      });
    }
    next();
  };
};
