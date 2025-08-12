import { Router, Request, Response } from 'express';
import { AuthenticatedRequest, verifyJWT } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/authMiddleware';
import UserModel from '../models/User';

const router = Router();

router.get('/profile', verifyJWT, requireRole(['student']), async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user?.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const user = await UserModel.findById(userId).select('firstName lastName email');
        // const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
