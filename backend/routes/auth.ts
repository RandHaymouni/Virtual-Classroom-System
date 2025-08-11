import express, { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyJWT, AuthenticatedRequest } from '../middleware/authMiddleware';
const router = express.Router();

interface LoginRequestBody {
    email: string;
    password: string;
    rememberMe?: boolean;
}

router.post('/signup', async (req: Request, res: Response) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            role,
            studentID,
            academicYear,
            university,
            subjectArea,
            phoneNumber,
            agreeToTerms,
        } = req.body;

        if (!email || !password || !role || !firstName || !lastName) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (role === 'student') {
            if (!academicYear) {
                return res.status(400).json({ message: 'Missing student required fields' });
            }
        }

        if (role === 'teacher') {
            if (!subjectArea || !university) {
                return res.status(400).json({ message: 'Missing teacher required fields' });
            }
        }

        if (agreeToTerms !== true) {
            return res.status(400).json({ message: 'You must agree to the terms' });
        }

        const emailNormalized = email.toLowerCase().trim();

        const existingUser = await User.findOne({ email: emailNormalized });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email: emailNormalized,
            password: hashedPassword,
            role,
            studentID,
            academicYear,
            university,
            subjectArea,
            phoneNumber,
            agreeToTerms,
        });

        await newUser.save();
        console.log('User saved:', newUser);
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(401).json({ message: 'Invalid usernmae or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid usernmae or password' });
        }

        const payload = {
            id: user._id,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || 'My$ecretK3y!@#2025_ThisIsStrongAndSafe', {
            expiresIn: rememberMe ? '30d' : '1d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        });

        res.json({
            status: 'success',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/logout', (req: Request, res: Response) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        sameSite: 'strict',
    });
    res.json({ message: 'Logged out successfully' });
});

router.get('/check', verifyJWT, (req: AuthenticatedRequest, res: Response) => {
    const allowedRoles = ['teacher', 'student'];
    if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({
        success: true,
        user: req.user,  // فيها id و role
    });
});
export default router;
